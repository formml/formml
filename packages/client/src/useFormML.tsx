import type { ValidationError } from '@formml/core'
import type { FormMLSchema } from '@formml/dsl'
import type * as H from 'hotscript'

import React from 'react'

import type { IndexRoot } from './IndexManager.js'

import { FormML } from './FormML.js'
import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'

export type SubmitHandler = (
  data: object,
  event: React.FormEvent<HTMLFormElement>,
) => void
export type SubmitErrorHandler = (errors: ValidationError[]) => void

type NonGenericParams = H.Call<
  H.Tuples.Drop<1>,
  ConstructorParameters<typeof FormML>
>

/**
 * Hook to create and manage a FormML instance
 *
 * @param schema - The FormML schema
 * @param options - Optional FormML configurations
 * @returns Object containing fields index root, FormML instance and helper components/functions
 *
 * @example
 * ```tsx
 * const { $form, FormML, handleSubmit } = useFormML(schema)
 *
 * const onSubmit = handleSubmit((data) => {
 *   console.log(data)
 * })
 *
 * return (
 *   <FormML>
 *     <form onSubmit={onSubmit}>
 *       <Field $bind={$form.email} />
 *       <Field $bind={$form.password} />
 *       <button>Submit</button>
 *     </form>
 *   </FormML>
 * )
 * ```
 */
export function useFormML<T extends FormMLSchema>(
  ...props: [schema: T, ...NonGenericParams]
) {
  const formML = useConstant(() => new FormML(...props), props)

  const handleSubmit =
    (
      onSubmit: SubmitHandler,
      onError?: SubmitErrorHandler,
    ): React.FormEventHandler<HTMLFormElement> =>
    (event) => {
      event.preventDefault()
      const result = formML.validateAll()
      if (result.isValid) {
        return onSubmit(formML.getTypedData(), event)
      }
      if (onError) {
        return onError(result.errors)
      }
    }

  const FormMLWrapper = React.useCallback(
    (props: React.PropsWithChildren) => (
      <FormMLProvider value={formML}>{props.children}</FormMLProvider>
    ),
    [formML],
  )

  return {
    $form: formML.indexRoot as IndexRoot<T>,
    FormML: FormMLWrapper,
    handleSubmit,
    instance: formML,
  }
}
