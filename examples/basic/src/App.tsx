import { ErrorMessage, Field, useFormML } from '@formml/client'

import basic from './basic.formml'

export default function App() {
  const { $form, FormML, handleSubmit } = useFormML(basic)
  return (
    <FormML>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log(data)
            alert('Form submitted successfully!')
          },
          (error) => {
            console.error(error)
            alert('Form submission failed!')
          },
        )}
      >
        <label>
          Text field
          <Field $bind={$form.textField} />
        </label>
        <ErrorMessage $bind={$form.textField} as="span" />

        <label>
          Number field
          <Field $bind={$form.numField} />
        </label>
        <ErrorMessage $bind={$form.numField} as="span" />

        <label>
          Boolean field
          <Field $bind={$form.boolField} />
        </label>
        <ErrorMessage $bind={$form.boolField} as="span" />

        <label>
          Datetime field
          <Field $bind={$form.datetimeField} />
        </label>
        <ErrorMessage $bind={$form.datetimeField} as="span" />

        <label>
          Decimal field
          <Field $bind={$form.decimalField} />
        </label>
        <ErrorMessage $bind={$form.decimalField} as="span" />

        <button>Submit</button>
      </form>
    </FormML>
  )
}
