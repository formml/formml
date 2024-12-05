[**@formml/core**](../README.md) • **Docs**

---

[@formml/core](../globals.md) / buildValibotSchema

# Function: buildValibotSchema()

## buildValibotSchema(formmlSchema, preprocess)

> **buildValibotSchema**\<`T`\>(`formmlSchema`, `preprocess`?): `v.GenericSchema`\<[`PrimitiveTypeMapping`](../namespaces/JSType/type-aliases/PrimitiveTypeMapping.md)\[`T`\]\>

Builds a Valibot schema from a FormML field

### Type Parameters

• **T** _extends_ `PRIMITIVE`

### Parameters

• **formmlSchema**: `Field`\<`T`\>

The FormML field schema

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

Optional preprocessors for each primitive type

### Returns

`v.GenericSchema`\<[`PrimitiveTypeMapping`](../namespaces/JSType/type-aliases/PrimitiveTypeMapping.md)\[`T`\]\>

A Valibot schema that validates the field data

### Example

```ts
// Without preprocess
const field = formml`
  form user {
    ⁣@min(18) num age
  }
`.form.fields[0]
const schema = buildValibotSchema(field)

v.parse(schema, 25) // ✓ returns 25
v.parse(schema, '25') // ✗ throws "Invalid type: Expected number but received "25""
v.parse(schema, 15) // ✗ throws "Invalid value: Number must be greater than or equal to 18"
v.parse(schema, undefined) // ✓ returns undefined (optional by default)

// With preprocess
const preprocess = {
  num: v.pipe(v.string(), v.transform(Number)),
}
const schema = buildValibotSchema(field, preprocess)

v.parse(schema, '25') // ✓ returns 25
v.parse(schema, 25) // ✗ throws "Invalid type: Expected string but received 25"
v.parse(schema, '15') // ✗ throws "Invalid value: Number must be greater than or equal to 18"
v.parse(schema, 'abc') // ✗ throws "Invalid type: Expected number but received NaN"
```

### Defined in

[validator/buildValibotSchema.ts:75](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/core/src/validator/buildValibotSchema.ts#L75)

## buildValibotSchema(formmlSchema, preprocess)

> **buildValibotSchema**(`formmlSchema`, `preprocess`?): `v.StrictObjectSchema`\<`Record`\<`string`, `v.GenericSchema`\>, `string`\>

Builds a Valibot schema from a FormML form

### Parameters

• **formmlSchema**: `Form`

The FormML form schema

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

Optional preprocessors for each primitive type

### Returns

`v.StrictObjectSchema`\<`Record`\<`string`, `v.GenericSchema`\>, `string`\>

A Valibot schema that validates all fields data in the form recursively

### Example

```ts
// Without preprocess
const form = formml`
  form user {
    ⁣@minLength(2)
    text name
    num age
  }
`.form
const schema = buildValibotSchema(form)

v.parse(schema, { name: 'John', age: 25 }) // ✓ returns { name: 'John', age: 25 }
v.parse(schema, { name: 'J', age: 25 }) // ✗ throws "Invalid value: String must have at least 2 characters" at name
v.parse(schema, { name: 'John', age: '25' }) // ✗ throws "Invalid type: Expected number but received "25"" at age
v.parse(schema, { name: 'John' }) // ✓ returns { name: 'John', age: undefined }

// With preprocess
const preprocess = {
  num: v.pipe(v.string(), v.transform(Number)),
}
const schema = buildValibotSchema(form, preprocess)

v.parse(schema, { name: 'John', age: '25' }) // ✓ returns { name: 'John', age: 25 }
v.parse(schema, { name: 'J', age: '25' }) // ✗ throws "Invalid value: String must have at least 2 characters" at name
v.parse(schema, { name: 'John', age: 25 }) // ✗ throws "Invalid type: Expected string but received 25" at age
v.parse(schema, { name: 'John', age: 'abc' }) // ✗ throws "Invalid type: Expected number but received NaN" at age
```

### Defined in

[validator/buildValibotSchema.ts:112](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/core/src/validator/buildValibotSchema.ts#L112)

## buildValibotSchema(formmlSchema, preprocess)

> **buildValibotSchema**(`formmlSchema`, `preprocess`?): `v.GenericSchema`

Builds a Valibot schema from a FormML field or form

### Parameters

• **formmlSchema**: `Field` \| `Form`

The FormML field or form schema

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

Optional preprocessors for each primitive type

### Returns

`v.GenericSchema`

A Valibot schema that validates the input

### Defined in

[validator/buildValibotSchema.ts:123](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/core/src/validator/buildValibotSchema.ts#L123)
