import React from 'react'

export type OnSubmitCallback = (data: object) => void

export default function useFormML(_dsl: string) {
  const data = {}
  const handleSubmit: (
    onSubmit: OnSubmitCallback,
  ) => React.FormEventHandler<HTMLFormElement> = (onSubmit) => (event) => {
    event.preventDefault()
    onSubmit(data)
  }
  return {
    handleSubmit,
  }
}
