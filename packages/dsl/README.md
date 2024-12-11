<h1 align="center">
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="https://raw.githubusercontent.com/formml/formml/main/docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
  <br>
  @formml/dsl
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@formml/dsl"><img src="https://img.shields.io/npm/v/@formml/dsl.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@formml/dsl"><img src="https://img.shields.io/npm/dm/@formml/dsl.svg" alt="npm downloads"></a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@formml/dsl.svg" alt="license"></a>
</p>

The domain-specific language (DSL) implementation for [**FormML**](https://github.com/formml/formml), providing the parser, type system, and language utilities for FormML Model files.

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

## Documentation

- [FormML Documentation](https://github.com/formml/formml#readme)

## License

MIT © [Jindong Zhang](https://github.com/jindong-zhannng)
