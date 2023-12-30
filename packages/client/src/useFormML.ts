import React from 'react'
import { createParser } from '@formml/dsl'

export type OnSubmitCallback = (data: object) => void

export default function useFormML(dsl: string) {
  const data = {}

  const parser = React.useMemo(() => createParser(), [])
  const indexRoot = React.useMemo(() => {
    const indexRoot: Record<string, unknown> = {}
    const ast = parser(dsl)
    for (const field of ast.form.fields) {
      indexRoot[field.name] = { $type: field.type }
    }
    return indexRoot
  }, [parser, dsl])

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
