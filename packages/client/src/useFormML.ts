import React from 'react'
import { createParser } from '@formml/dsl'

export type OnSubmitCallback = (data: object) => void

export default function useFormML(dsl: string) {
  const data = {}

  const indexRoot: Record<string, unknown> = {}
  const parser = createParser()
  const ast = parser(dsl).value
  for (const field of ast.form.fields) {
    indexRoot[field.name] = { $type: field.type }
  }

  const handleSubmit: (
    onSubmit: OnSubmitCallback,
  ) => React.FormEventHandler<HTMLFormElement> = (onSubmit) => (event) => {
    event.preventDefault()
    onSubmit(data)
  }

  return {
    indexRoot,
    handleSubmit,
  }
}
