import useFormML from '../../src/useFormML.js'
import Input from './Input.js'
import dsl from './SignUp.formml?raw'

const submitData = (data: unknown) => {
  alert('logged!')
  console.log(data)
}

export default function SignUpForm() {
  const { FormML, handleSubmit, indexRoot } = useFormML(dsl)
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
        <Input id="username" index={indexRoot['username']} />
        <label htmlFor="password">Password</label>
        <Input id="password" index={indexRoot['password']} />
        <label htmlFor="phoneNumber">Phone number</label>
        <Input id="phoneNumber" index={indexRoot['phoneNumber']} />
        <label htmlFor="birthDay">Birth day</label>
        <Input id="birthDay" index={indexRoot['birthDay']} />
        <label htmlFor="age">Age</label>
        <Input id="age" index={indexRoot['age']} />
        <label htmlFor="receiveMarketingEmails">
          Want to receive marketing emails?
        </label>
        <Input
          id="receiveMarketingEmails"
          index={indexRoot['receiveMarketingEmails']}
        />
        <button style={{ gridColumn: '1 / -1' }}>Sign up!</button>
      </form>
    </FormML>
  )
}
