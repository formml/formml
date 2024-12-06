<p align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
</p>

<h1 align="center">rollup-plugin-formml</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rollup-plugin-formml"><img src="https://img.shields.io/npm/v/rollup-plugin-formml.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/rollup-plugin-formml"><img src="https://img.shields.io/npm/dm/rollup-plugin-formml.svg" alt="npm downloads"></a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/rollup-plugin-formml.svg" alt="license"></a>
</p>

A [Rollup](https://rollupjs.org/) and [Vite](https://vitejs.dev/) compatible plugin for importing [FormML](https://github.com/formml/formml) files (`.fml` or `.formml`) into JavaScript files.

## Installation

```bash
npm install rollup-plugin-formml --save-dev
```

## Usage

### Rollup

```js
// rollup.config.mjs
import formml from 'rollup-plugin-formml'

export default {
  plugins: [formml()],
}
```

### Vite

```js
// vite.config.ts
import { defineConfig } from 'vite'
import formml from 'rollup-plugin-formml'

export default defineConfig({
  plugins: [formml()],
})
```

Then you can import `.fml` files directly in your code:

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
// SignUpForm.tsx
import SignUpModel from './sign-up.fml'
import { useFormML } from '@formml/react'

export default function SignUpForm() {
  const { $form } = useFormML(SignUpModel)
  // ...
}
```

## Documentation

For more information about FormML and how to use it in your project, please refer to:

- [FormML Documentation](https://github.com/formml/formml#readme)

## License

MIT © [Jindong Zhang](https://github.com/jindong-zhannng)
