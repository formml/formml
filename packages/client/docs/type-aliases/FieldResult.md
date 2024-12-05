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

[FormML.ts:36](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L36)
