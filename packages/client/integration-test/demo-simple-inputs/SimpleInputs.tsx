import ErrorMessage from '../../src/ErrorMessage.js'
import { useField } from '../../src/useField.js'
import { useFormML } from '../../src/useFormML.js'
import schema from './SimpleInputs.formml?raw'
import './styles.css'

function Input({ $bind }: { $bind: object }) {
  const { field } = useField($bind)
  return <input {...field} />
}

export default function SimpleInputs() {
  const { $form, FormML, handleSubmit } = useFormML(schema)
  return (
    <FormML>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          alert('logged!')
          console.log(data)
        })}
      >
        <label>
          Text
          <Input $bind={$form['textField']} />
          <ErrorMessage $bind={$form['textField']} as="span" />
        </label>
        <label>
          Number
          <Input $bind={$form['numberField']} />
          <ErrorMessage $bind={$form['numberField']} as="span" />
        </label>

        <label>
          Bool
          <Input $bind={$form['booleanField']} />
          <ErrorMessage $bind={$form['booleanField']} as="span" />
        </label>
        <label>
          Datetime
          <Input $bind={$form['datetimeField']} />
          <ErrorMessage $bind={$form['datetimeField']} as="span" />
        </label>
        <label>
          Decimal
          <Input $bind={$form['decimalField']} />
          <ErrorMessage $bind={$form['decimalField']} as="span" />
        </label>
        <button>Submit</button>
      </form>
    </FormML>
  )
}
