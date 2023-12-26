export type OnSubmitCallback = (data: object) => void

export default function useFormML(_dsl: string) {
  const data = {}
  return {
    handleSubmit: (onSubmit: OnSubmitCallback) => () => {
      onSubmit(data)
    },
  }
}
