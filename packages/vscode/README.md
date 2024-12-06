<p align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.png" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.png" alt="FormML Logo" width="300">
    </picture>
  </a>
</p>

<h1 align="center">FormML VSCode Extension</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=formml.vscode-formml">
    <img src="https://img.shields.io/visual-studio-marketplace/v/formml.vscode-formml" alt="VS Code Marketplace">
  </a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

The official VSCode extension for [FormML](https://github.com/formml/formml), providing rich language features for `.fml` (or `.formml`) files including:

- Syntax highlighting
- Code completion
- Error detection
- Go to definition
- Find references
- And more...

## Quick Start

1. Install the extension from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=formml.vscode-formml)

2. Create a new file with `.fml` extension

3. Start writing your FormML Model:

```java
form SignUp {
  @required
  text     name
  @email
  text     email
  @minLength(8)
  text     password
  datetime birthday
}
```

The extension will automatically provide:

- Syntax highlighting
- Validation as you type
- Code completion for field types and annotations
- Hover information for annotations

## Learn More

For more information about FormML:

- [FormML Documentation](https://github.com/formml/formml#readme)
- [FormML Model (DSL) Reference](https://github.com/formml/formml#formml-model-dsl-reference)

## License

MIT © [Jindong Zhang](https://github.com/jindong-zhannng)
