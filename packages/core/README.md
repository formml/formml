<p align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
</p>

<h1 align="center">@formml/core</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@formml/core"><img src="https://img.shields.io/npm/v/@formml/core.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@formml/core"><img src="https://img.shields.io/npm/dm/@formml/core.svg" alt="npm downloads"></a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@formml/core.svg" alt="license"></a>
</p>

Core package of [**FormML**](https://github.com/formml/formml), providing APIs for evaluating FormML Models in both browser and Node.js environments.

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

```ts
// server.ts
import express from 'express'
import { parse } from '@formml/core'
import SignUp from './sign-up.fml'

const app = express()

app.post('/sign-up', (req, res) => {
  // Validate & parse plain object into rich object
  const data = parse(req.body, SignUp)
  // data is now:
  // {
  //   name: "John",
  //   email: "john@example.com",
  //   password: "password",
  //   birthday: Date("1999-12-31T00:00:00.000Z"),
  // }
  res.status(201).end()
})
```

## Documentation

- [FormML Documentation](https://github.com/formml/formml#readme)
- [API Reference](./docs/globals.md)

## License

MIT © [Jindong Zhang](https://github.com/jindong-zhannng)
