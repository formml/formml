[**@formml/core**](../README.md) • **Docs**

---

[@formml/core](../globals.md) / buildSchema

# Function: buildSchema()

## buildSchema(formmlSchema, preprocess)

> **buildSchema**\<`T`\>(`formmlSchema`, `preprocess`?): `v.GenericSchema`\<[`PrimitiveTypeMapping`](../namespaces/JSType/type-aliases/PrimitiveTypeMapping.md)\[`T`\]\>

### Type Parameters

• **T** _extends_ `PRIMITIVE`

### Parameters

• **formmlSchema**: `Field`\<`T`\>

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

### Returns

`v.GenericSchema`\<[`PrimitiveTypeMapping`](../namespaces/JSType/type-aliases/PrimitiveTypeMapping.md)\[`T`\]\>

### Defined in

[validator/buildSchema.ts:45](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/validator/buildSchema.ts#L45)

## buildSchema(formmlSchema, preprocess)

> **buildSchema**(`formmlSchema`, `preprocess`?): `v.StrictObjectSchema`\<`Record`\<`string`, `v.GenericSchema`\>, `string`\>

### Parameters

• **formmlSchema**: `Form`

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

### Returns

`v.StrictObjectSchema`\<`Record`\<`string`, `v.GenericSchema`\>, `string`\>

### Defined in

[validator/buildSchema.ts:49](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/validator/buildSchema.ts#L49)

## buildSchema(formmlSchema, preprocess)

> **buildSchema**(`formmlSchema`, `preprocess`?): `v.GenericSchema`

### Parameters

• **formmlSchema**: `Field` \| `Form`

• **preprocess?**: `Record`\<`PRIMITIVE`, `GenericSchema`\<`unknown`, `unknown`, `BaseIssue`\<`unknown`\>\>\>

### Returns

`v.GenericSchema`

### Defined in

[validator/buildSchema.ts:53](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/validator/buildSchema.ts#L53)
