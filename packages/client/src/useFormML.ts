import React from 'react'
import FormML from './FormML.js'

export type OnSubmitCallback = (data: object) => void

export default function useFormML(dsl: string) {
  const data = {}

  const formML = React.useMemo(() => new FormML(dsl), [dsl])

  const handleSubmit: (
    onSubmit: OnSubmitCallback,
  ) => React.FormEventHandler<HTMLFormElement> = (onSubmit) => (event) => {
    event.preventDefault()
    onSubmit(data)
  }

  return {
    indexRoot: formML.indexRoot,
    handleSubmit,
  }
}
