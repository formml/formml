[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / FieldResult

# Type Alias: FieldResult

> **FieldResult**: `object`

## Type declaration

### \_internalState

> **\_internalState**: `object`

### \_internalState.isInitiallyValidated

> **isInitiallyValidated**: `boolean`

### blur()

> **blur**: () => `void`

#### Returns

`void`

### commitRawValue()

> **commitRawValue**: () => `void`

#### Returns

`void`

### error

> **error**: `ValidationError` \| `undefined`

### rawValue

> **rawValue**: `string`

### schema

> **schema**: `Field`

### setRawValue()

> **setRawValue**: (`value`) => `void`

#### Parameters

• **value**: `string`

#### Returns

`void`

### setTypedValue()

> **setTypedValue**: (`value`) => `void`

#### Parameters

• **value**: `JSType.PrimitiveType`

#### Returns

`void`

### setValue()

> **setValue**: (`value`) => `void`

#### Parameters

• **value**: `JSType.PrimitiveType`

#### Returns

`void`

### touched

> **touched**: `boolean`

### value

> **value**: `JSType.PrimitiveType`

## Defined in

[packages/client/src/FormML.ts:26](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/client/src/FormML.ts#L26)
