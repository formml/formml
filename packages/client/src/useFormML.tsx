import React from 'react'

import { FormML } from './FormML.js'
import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'

export type OnSubmitCallback = (data: object) => void

export function useFormML(schema: string) {
  const formML = useConstant(() => new FormML(schema), [schema])

  const handleSubmit: (
    onSubmit: OnSubmitCallback,
  ) => React.FormEventHandler<HTMLFormElement> = (onSubmit) => (event) => {
    event.preventDefault()
    const result = formML.validate()
    if (result.isValid) {
      onSubmit(formML.getTypedData())
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
