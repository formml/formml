import React from 'react'

import FormML from './FormML.js'
import { FormMLProvider } from './useFormMLContext.js'
import useConstant from './utils/useConstant.js'

export type OnSubmitCallback = (data: object) => void

export default function useFormML(dsl: string) {
  const formML = useConstant(() => new FormML(dsl), [dsl])

  const handleSubmit: (
    onSubmit: OnSubmitCallback,
  ) => React.FormEventHandler<HTMLFormElement> = (onSubmit) => (event) => {
    event.preventDefault()
    onSubmit(formML.getTypedData())
  }

  const FormMLWrapper = React.useCallback(
    (props: React.PropsWithChildren) => (
      <FormMLProvider value={formML}>{props.children}</FormMLProvider>
    ),
    [formML],
  )

  return {
    FormML: FormMLWrapper,
    handleSubmit,
    indexRoot: formML.indexRoot,
  }
}
