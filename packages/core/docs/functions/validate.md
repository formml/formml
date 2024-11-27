[**@formml/core**](../README.md) • **Docs**

---

[@formml/core](../globals.md) / validate

# Function: validate()

> **validate**(`data`, `schema`): [`ValidationResult`](../type-aliases/ValidationResult.md)

Validates unknown data against a FormML schema.

## Parameters

• **data**: `unknown`

The data to validate

• **schema**: `FormMLSchema`

The FormML schema to validate against

## Returns

[`ValidationResult`](../type-aliases/ValidationResult.md)

A validation result object indicating success or failure

## Example

```ts
const schema = formml`
  form user {
    ⁣@required
    text name
    ⁣@required
    num age
    datetime birthday
  }
`

const result1 = validate(
  {
    name: 'John',
    age: 25,
    birthday: new Date('1999-12-31'),
  },
  schema,
)
// { isValid: true }

const result2 = validate({ name: 'Jane' }, schema)
// { isValid: false, errors: ValidationError[] }
```

## Defined in

[validator/validate.ts:45](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/core/src/validator/validate.ts#L45)
