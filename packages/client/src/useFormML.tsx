import { FormMLSchema } from '@formml/dsl'
import * as H from 'hotscript'
import React from 'react'

import { FormML } from './FormML.js'
import { IndexRoot } from './IndexManager.js'
import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'
import { ValidationError } from './validator/index.js'

export type SubmitHandler = (
  data: object,
  event: React.FormEvent<HTMLFormElement>,
) => void
export type SubmitErrorHandler = (errors: ValidationError[]) => void

type NonGenericParams = H.Call<
  H.Tuples.Drop<1>,
  ConstructorParameters<typeof FormML>
>

export function useFormML<T extends FormMLSchema>(
  ...props: [T, ...NonGenericParams]
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
