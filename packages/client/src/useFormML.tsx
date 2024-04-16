import React from 'react'

import { FormML } from './FormML.js'
import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'
import { ValidationError } from './validate/index.js'

export type SubmitHandler = (data: object) => void
export type SubmitErrorHandler = (errors: ValidationError[]) => void

export function useFormML(schema: string) {
  const formML = useConstant(() => new FormML(schema), [schema])

  const handleSubmit =
    (
      onSubmit: SubmitHandler,
      onError?: SubmitErrorHandler,
    ): React.FormEventHandler<HTMLFormElement> =>
    (event) => {
      event.preventDefault()
      const result = formML.validate()
      if (result.isValid) {
        return onSubmit(formML.getTypedData())
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
    $form: formML.indexRoot,
    FormML: FormMLWrapper,
    handleSubmit,
    instance: formML,
  }
}
