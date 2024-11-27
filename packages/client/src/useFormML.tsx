import type { ValidationError } from '@formml/core'
import type { FormMLSchema } from '@formml/dsl'

import React from 'react'

import type { PartialFormMLOptions } from './FormML.js'
import type { IndexRoot } from './IndexManager.js'

import { FormML } from './FormML.js'
import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'

export type SubmitHandler = (
  data: object,
  event: React.FormEvent<HTMLFormElement>,
) => void
export type SubmitErrorHandler = (errors: ValidationError[]) => void

/**
 * Hook to create and manage a FormML instance
 * @param schema - The FormML schema
 * @param options - Optional FormML configurations
 * @returns Object containing fields index root, FormML instance and helper components/functions
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
  schema: T,
  options?: PartialFormMLOptions,
) {
  const formML = useConstant(
    () => new FormML(schema, options),
    [schema, options],
  )

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
