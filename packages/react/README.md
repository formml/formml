<p align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
</p>

<h1 align="center">@formml/react</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@formml/react"><img src="https://img.shields.io/npm/v/@formml/react.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@formml/react"><img src="https://img.shields.io/npm/dm/@formml/react.svg" alt="npm downloads"></a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@formml/react.svg" alt="license"></a>
</p>

React bindings for [**FormML**](https://github.com/formml/formml), providing hooks and components for seamless integration of FormML Models in React applications.

## Quick Start

```java
// sign-up.fml
form SignUp {
  @required("Let me know your cool name!")
  text     name
  @required @email
  text     email
  @required @minLength(8)
  text     password
  datetime birthday
}
```

```jsx
// SignUpForm.tsx
import { Field, ErrorMessage, useFormML } from '@formml/react'

import SignUpModel from './sign-up.fml'

function SignUpForm() {
  const { $form, FormML, handleSubmit } = useFormML(SignUpModel)

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted:', data)
  })

  return (
    <FormML>
      <form onSubmit={onSubmit}>
        <Field $bind={$form.name} />
        <ErrorMessage $bind={$form.name} />

        <Field $bind={$form.email} />
        <ErrorMessage $bind={$form.email} />

        <Field $bind={$form.password} />
        <ErrorMessage $bind={$form.password} />

        <Field $bind={$form.birthday} />
        <ErrorMessage $bind={$form.birthday} />

        <button>Sign Up</button>
      </form>
    </FormML>
  )
}
```

## Documentation

- [FormML Documentation](https://github.com/formml/formml#readme)
- [API Reference](./docs/globals.md)

## License

MIT © [Jindong Zhang](https://github.com/jindong-zhannng)
