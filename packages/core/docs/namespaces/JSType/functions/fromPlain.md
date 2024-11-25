[**@formml/core**](../../../README.md) • **Docs**

---

[@formml/core](../../../globals.md) / [JSType](../README.md) / fromPlain

# Function: fromPlain()

## fromPlain(type)

> **fromPlain**\<`TType`\>(`type`): (`plain`) => [`PrimitiveTypeMapping`](../type-aliases/PrimitiveTypeMapping.md)\[`TType`\] \| `undefined`

Creates a function that converts a plain value to a specific primitive type.

### Type Parameters

• **TType** _extends_ `PRIMITIVE`

### Parameters

• **type**: `TType`

The primitive type to convert to.

### Returns

`Function`

A function that takes a plain value and returns the converted primitive type or `undefined`.

#### Parameters

• **plain**: `unknown`

#### Returns

[`PrimitiveTypeMapping`](../type-aliases/PrimitiveTypeMapping.md)\[`TType`\] \| `undefined`

### Example

```ts
// text: JS string
const result = fromPlain('text')('hello') // 'hello'
// num: JS number
const result = fromPlain('num')(123.45) // 123.45
const result = fromPlain('num')('123.45') // undefined
// bool: JS boolean
const result = fromPlain('bool')(true) // true
const result = fromPlain('bool')('true') // undefined
// datetime: Date object or ISO datetime string
const result = fromPlain('datetime')(new Date()) // Date object
const result = fromPlain('datetime')('2024-01-01T00:00:00Z') // Date object
// decimal: BigNumber object or decimal string
const result = fromPlain('decimal')(new BigNumber('123.45')) // BigNumber(123.45)
const result = fromPlain('decimal')('123.45') // BigNumber(123.45)
```

### Defined in

[js-type/plain/conversion.ts:31](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/js-type/plain/conversion.ts#L31)

## fromPlain(plain, type)

> **fromPlain**\<`TType`\>(`plain`, `type`): [`PrimitiveTypeMapping`](../type-aliases/PrimitiveTypeMapping.md)\[`TType`\] \| `undefined`

Converts a plain value to a specific primitive type.

### Type Parameters

• **TType** _extends_ `PRIMITIVE`

### Parameters

• **plain**: `unknown`

The value to convert.

• **type**: `TType`

The primitive type to convert to.

### Returns

[`PrimitiveTypeMapping`](../type-aliases/PrimitiveTypeMapping.md)\[`TType`\] \| `undefined`

The converted primitive value or `undefined` if the conversion is not supported.

### Example

```ts
// text: JS string
const result = fromPlain('hello', 'text') // 'hello'
// num: JS number
const result = fromPlain(123.45, 'num') // 123.45
const result = fromPlain('123.45', 'num') // undefined
// bool: JS boolean
const result = fromPlain(true, 'bool') // true
const result = fromPlain('true', 'bool') // undefined
// datetime: Date object or ISO datetime string
const result = fromPlain(new Date(), 'datetime') // Date object
const result = fromPlain('2024-01-01T00:00:00Z', 'datetime') // Date object
// decimal: BigNumber object or decimal string
const result = fromPlain(new BigNumber('123.45'), 'decimal') // BigNumber(123.45)
const result = fromPlain('123.45', 'decimal') // BigNumber(123.45)
```

### Defined in

[js-type/plain/conversion.ts:58](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/js-type/plain/conversion.ts#L58)
