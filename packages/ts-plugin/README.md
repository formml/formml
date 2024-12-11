<h1 align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
  <br>
  @formml/ts-plugin
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@formml/ts-plugin"><img src="https://img.shields.io/npm/v/@formml/ts-plugin.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@formml/ts-plugin"><img src="https://img.shields.io/npm/dm/@formml/ts-plugin.svg" alt="npm downloads"></a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@formml/ts-plugin.svg" alt="license"></a>
</p>

A [TypeScript Language Service Plugin](https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin) that enables real-time type inference and IntelliSense for FormML Models imported in TypeScript files.

## Features

- Real-time type inference for FormML Models
- IntelliSense support (autocompletion, hover info)
- Seamless integration with TypeScript projects
- No code generation required

## Installation

1. Install the plugin:

   ```bash
   npm install @formml/ts-plugin --save-dev
   ```

2. Configure TypeScript to use the plugin in your `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "plugins": [{ "name": "@formml/ts-plugin" }]
     }
   }
   ```

3. (For VSCode users) Configure VSCode to [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

## Usage

Once installed and configured, you can import FormML files directly in your TypeScript code:

```ts
import SignUp from './sign-up.fml'

// Full type information available!
const { $form } = useFormML(SignUp)
```

## Documentation

For more detailed information about FormML and `@formml/ts-plugin`:

- [FormML Documentation](https://github.com/formml/formml#readme)
- [Why not code generation?](https://github.com/formml/formml#why-not-code-generation)
- [Using `tsc` to check FormML Model types](https://github.com/formml/formml#using-tsc-to-check-formml-model-types)

## License

MIT © [Jindong Zhang](https://github.com/jindong-z)
