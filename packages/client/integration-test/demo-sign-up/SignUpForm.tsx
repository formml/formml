import { Field } from '../../src/Field.js'
import { useFormML } from '../../src/useFormML.js'
import schema from './SignUp.formml?raw'

const submitData = (data: unknown) => {
  alert('logged!')
  console.log(data)
}

export default function SignUpForm() {
  const { FormML, handleSubmit, indexRoot } = useFormML(schema)
  return (
    <FormML>
      <h2>Sign up your account</h2>
      <form
        onSubmit={handleSubmit(submitData)}
        style={{
          display: 'grid',
          gap: '15px',
          gridTemplateColumns: '1fr 1fr',
          width: '500px',
        }}
      >
        <label htmlFor="username">Username</label>
        <Field $bind={indexRoot['username']} id="username" />

        <label htmlFor="password">Password</label>
        <Field $bind={indexRoot['password']} id="password" />

        <label htmlFor="phoneNumber">Phone number</label>
        <Field $bind={indexRoot['phoneNumber']} id="phoneNumber" />

        <label htmlFor="birthDay">Birth day</label>
        <Field $bind={indexRoot['birthDay']} id="birthDay" />

        <label htmlFor="age">Age</label>
        <Field $bind={indexRoot['age']} id="age" />

        <label htmlFor="biography">Biography</label>
        <Field $bind={indexRoot['biography']} as="textarea" id="biography" />

        <label htmlFor="receiveMarketingEmails">
          Want to receive marketing emails?
        </label>
        <Field
          $bind={indexRoot['receiveMarketingEmails']}
          id="receiveMarketingEmails"
        />

        <button style={{ gridColumn: '1 / -1' }}>Sign up!</button>
      </form>
    </FormML>
  )
}
