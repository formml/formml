[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / FieldHelpers

# Interface: FieldHelpers

## Methods

### blur()

> **blur**(): `void`

Marks the field as touched, indicating user interaction

#### Returns

`void`

#### Defined in

[packages/client/src/useField.ts:39](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useField.ts#L39)

---

### commitRawValue()

> **commitRawValue**(): `void`

Commits the current raw string value to storage, converting it to the field's type and triggering post-processes.
Usually used together with [setRawValue](FieldHelpers.md#setrawvalue).

#### Returns

`void`

#### Example

```ts
field.helpers.setRawValue('123')
field.helpers.commitRawValue() // Converts string "123" to number 123 for `num` fields
```

#### Defined in

[packages/client/src/useField.ts:50](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useField.ts#L50)

---

### setRawValue()

> **setRawValue**(`value`): `void`

Sets the raw string value to represent user input, without any post-processes.

#### Parameters

• **value**: `string`

The string value to set

#### Returns

`void`

#### Defined in

[packages/client/src/useField.ts:56](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useField.ts#L56)

---

### setTypedValue()

> **setTypedValue**(`value`): `void`

Sets the typed value directly into storage, triggering post-processes.

#### Parameters

• **value**: `PrimitiveType`

The typed value matching the field's type

#### Returns

`void`

#### Defined in

[packages/client/src/useField.ts:62](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useField.ts#L62)
