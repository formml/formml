[**@formml/core**](../README.md) • **Docs**

---

[@formml/core](../globals.md) / parse

# Function: parse()

> **parse**\<`T`\>(`data`, `schema`): `InferParsed`\<`T`\>

Parses plain data to be typed according to a FormML schema. Throws error if validation fails.

This function is mainly used to parse JSON data from form submissions.

| FormML Type | Plain (JSON) Type | Parsed Type |
| ----------- | ----------------- | ----------- |
| text        | string            | string      |
| num         | number            | number      |
| decimal     | string            | BigNumber   |
| datetime    | string            | Date        |
| bool        | boolean           | boolean     |

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Parameters

• **data**: `unknown`

The data to parse

• **schema**: `T`

The FormML schema to validate against

## Returns

`InferParsed`\<`T`\>

The typed data

## Example

```ts
const schema = formml`
  form user {
    text name
    num age
    datetime birthday
    decimal salary
  }
`

// likely comes from JSON.parse()
const data = {
  name: 'John',
  age: 25,
  birthday: '1999-12-31T00:00:00.000Z',
  salary: '100001.23',
}

const result = parse(data, schema)
// {
//   name: "John",
//   age: 25,
//   birthday: Date("1999-12-31T00:00:00.000Z"),
//   salary: BigNumber("100001.23")
// }
```

## Defined in

[validator/parsers.ts:99](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/core/src/validator/parsers.ts#L99)
