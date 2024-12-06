# FormML Basic Example

A minimal example demonstrating FormML's core features with all primitive field types:

- `text` field
- `num` field
- `bool` field
- `datetime` field
- `decimal` field

This example uses [Simple.css](https://simplecss.org/) for basic styling.

## Running the Example

Make sure you have [pnpm](https://pnpm.io/) installed, then:

1. Install dependencies from the root of the monorepo:

```bash
pnpm install
```

2. Run the example:

```bash
pnpm --filter basic-example dev
```

The example will be available at `http://localhost:5173`.

## Project Structure

- `tsconfig.json` - TypeScript configuration that enables `@formml/ts-plugin`
- `vite.config.ts` - Vite configuration that enables `rollup-plugin-formml` to transform `*.fml` files
- `src/`
  - `basic.fml` - The FormML Model
  - `App.tsx` - The main React component implementing the form
  - `formml.d.ts` - TypeScript declaration for `*.fml` files only used for `tsc`
- `style/`
  - `overrides.css` - Custom styles extending Simple.css
