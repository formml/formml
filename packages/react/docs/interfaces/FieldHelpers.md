[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / FieldHelpers

# Interface: FieldHelpers

## Methods

### blur()

> **blur**(`this`): `void`

Marks the field as touched, indicating user interaction

#### Parameters

• **this**: `void`

#### Returns

`void`

#### Defined in

[packages/react/src/useField.ts:37](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useField.ts#L37)

---

### commitRawValue()

> **commitRawValue**(`this`): `void`

Commits the current raw string value to storage, converting it to the field's type and triggering post-processes.
Usually used together with [setRawValue](FieldHelpers.md#setrawvalue).

#### Parameters

• **this**: `void`

#### Returns

`void`

#### Example

```ts
field.helpers.setRawValue('123')
field.helpers.commitRawValue() // Converts string "123" to number 123 for `num` fields
```

#### Defined in

[packages/react/src/useField.ts:48](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useField.ts#L48)

---

### setRawValue()

> **setRawValue**(`this`, `value`): `void`

Sets the raw string value to represent user input, without any post-processes.

#### Parameters

• **this**: `void`

• **value**: `string`

The string value to set

#### Returns

`void`

#### Defined in

[packages/react/src/useField.ts:54](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useField.ts#L54)

---

### setTypedValue()

> **setTypedValue**(`this`, `value`): `void`

Sets the typed value directly into storage, triggering post-processes.

#### Parameters

• **this**: `void`

• **value**: `PrimitiveType`

The typed value matching the field's type

#### Returns

`void`

#### Defined in

[packages/react/src/useField.ts:60](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useField.ts#L60)
