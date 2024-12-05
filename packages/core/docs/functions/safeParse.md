[**@formml/core**](../README.md) • **Docs**

---

[@formml/core](../globals.md) / safeParse

# Function: safeParse()

> **safeParse**\<`T`\>(`data`, `schema`): [`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`InferParsed`\<`T`\>\>

Safely parses plain data to be typed according to a FormML schema.

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

[`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`InferParsed`\<`T`\>\>

The result object with typed data or validation errors

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

const result1 = safeParse(
  {
    name: 'John',
    age: 25,
    birthday: '1999-12-31T00:00:00.000Z',
    salary: '100001.23',
  },
  schema,
)
// {
//   isValid: true,
//   typed: true,
//   output: {
//     name: "John",
//     age: 25,
//     birthday: Date("1999-12-31T00:00:00.000Z"),
//     salary: BigNumber("100001.23")
//   }
// }

const result2 = safeParse({ name: 'John', age: 'abc' }, schema)
// {
//   isValid: false,
//   typed: false,
//   errors: ValidationError[]
// }
```

## Defined in

[validator/parsers.ts:177](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/core/src/validator/parsers.ts#L177)
