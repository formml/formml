import ErrorMessage from '../../src/ErrorMessage.js'
import { Field } from '../../src/Field.js'
import { useFormML } from '../../src/useFormML.js'
import schema from './SignUp.formml?raw'
import './styles.css'

const submitData = (data: unknown) => {
  alert('logged!')
  console.log(data)
}

export default function SignUpForm() {
  const { $form, FormML, handleSubmit } = useFormML(schema)
  return (
    <FormML>
      <h2>Sign up your account</h2>
      <form className="form-container" onSubmit={handleSubmit(submitData)}>
        <label htmlFor="username">Username</label>
        <div>
          <Field $bind={$form['username']} id="username" />
          <ErrorMessage $bind={$form['username']} as="span" />
        </div>

        <label htmlFor="password">Password</label>
        <div>
          <Field $bind={$form['password']} id="password" />
          <ErrorMessage $bind={$form['password']} as="span" />
        </div>

        <label htmlFor="phoneNumber">Phone number</label>
        <div>
          <Field $bind={$form['phoneNumber']} id="phoneNumber" />
          <ErrorMessage $bind={$form['phoneNumber']} as="span" />
        </div>

        <label htmlFor="birthDay">Birth day</label>
        <div>
          <Field $bind={$form['birthDay']} id="birthDay" />
          <ErrorMessage $bind={$form['birthDay']} as="span" />
        </div>

        <label htmlFor="age">Age</label>
        <div>
          <Field $bind={$form['age']} id="age" />
          <ErrorMessage $bind={$form['age']} as="span" />
        </div>

        <label htmlFor="biography">Biography</label>
        <div>
          <Field $bind={$form['biography']} as="textarea" id="biography" />
          <ErrorMessage $bind={$form['biography']} as="span" />
        </div>

        <label htmlFor="receiveMarketingEmails">
          Want to receive marketing emails?
        </label>
        <div>
          <Field
            $bind={$form['receiveMarketingEmails']}
            id="receiveMarketingEmails"
          />
          <ErrorMessage $bind={$form['receiveMarketingEmails']} as="span" />
        </div>

        <button>Sign up!</button>
      </form>
    </FormML>
  )
}
