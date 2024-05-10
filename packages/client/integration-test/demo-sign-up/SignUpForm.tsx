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
        <Field $bind={$form['username']} id="username" />

        <label htmlFor="password">Password</label>
        <Field $bind={$form['password']} id="password" />

        <label htmlFor="phoneNumber">Phone number</label>
        <Field $bind={$form['phoneNumber']} id="phoneNumber" />

        <label htmlFor="birthDay">Birth day</label>
        <Field $bind={$form['birthDay']} id="birthDay" />

        <label htmlFor="age">Age</label>
        <Field $bind={$form['age']} id="age" />

        <label htmlFor="biography">Biography</label>
        <Field $bind={$form['biography']} as="textarea" id="biography" />

        <label htmlFor="receiveMarketingEmails">
          Want to receive marketing emails?
        </label>
        <Field
          $bind={$form['receiveMarketingEmails']}
          id="receiveMarketingEmails"
        />

        <button className="submit-btn">Sign up!</button>
      </form>
    </FormML>
  )
}
