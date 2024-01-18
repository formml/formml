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
        <Field id="username" index={indexRoot['username']} />

        <label htmlFor="password">Password</label>
        <Field id="password" index={indexRoot['password']} />

        <label htmlFor="phoneNumber">Phone number</label>
        <Field id="phoneNumber" index={indexRoot['phoneNumber']} />

        <label htmlFor="birthDay">Birth day</label>
        <Field id="birthDay" index={indexRoot['birthDay']} />

        <label htmlFor="age">Age</label>
        <Field id="age" index={indexRoot['age']} />

        <label htmlFor="biography">Biography</label>
        <Field as="textarea" id="biography" index={indexRoot['biography']} />

        <label htmlFor="receiveMarketingEmails">
          Want to receive marketing emails?
        </label>
        <Field
          id="receiveMarketingEmails"
          index={indexRoot['receiveMarketingEmails']}
        />

        <button style={{ gridColumn: '1 / -1' }}>Sign up!</button>
      </form>
    </FormML>
  )
}
