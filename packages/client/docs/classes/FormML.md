[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / FormML

# Class: FormML\<T\>

## Type Parameters

• **T** _extends_ `FormMLSchema` = `FormMLSchema`

## Constructors

### new FormML()

> **new FormML**\<`T`\>(`schema`, `options`?): [`FormML`](FormML.md)\<`T`\>

#### Parameters

• **schema**: `T`

• **options?**: `DeepPartial`\<[`FormMLOptions`](../type-aliases/FormMLOptions.md)\>

#### Returns

[`FormML`](FormML.md)\<`T`\>

#### Defined in

[packages/client/src/FormML.ts:96](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L96)

## Properties

### options

> `readonly` **options**: [`FormMLOptions`](../type-aliases/FormMLOptions.md)

#### Defined in

[packages/client/src/FormML.ts:94](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L94)

## Accessors

### indexRoot

#### Get Signature

> **get** **indexRoot**(): `IndexRoot`\<`T`\>

##### Returns

`IndexRoot`\<`T`\>

#### Defined in

[packages/client/src/FormML.ts:260](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L260)

## Methods

### blur()

> **blur**(`index`): `void`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:143](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L143)

---

### commitRawValue()

> **commitRawValue**(`index`): `void`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:150](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L150)

---

### getField()

> **getField**(`index`): [`FieldResult`](../type-aliases/FieldResult.md)

#### Parameters

• **index**: `BaseIndex`

#### Returns

[`FieldResult`](../type-aliases/FieldResult.md)

#### Defined in

[packages/client/src/FormML.ts:158](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L158)

---

### getTypedData()

> **getTypedData**(): `Record`\<`string`, `PrimitiveType`\>

#### Returns

`Record`\<`string`, `PrimitiveType`\>

#### Defined in

[packages/client/src/FormML.ts:173](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L173)

---

### setRawValue()

> **setRawValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `string`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:178](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L178)

---

### setTypedValue()

> **setTypedValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:186](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L186)

---

### setValue()

> **setValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:195](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L195)

---

### subscribe()

> **subscribe**(`index`, `callback`): () => `void`

#### Parameters

• **index**: `BaseIndex`

• **callback**

#### Returns

`Function`

##### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:203](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L203)

---

### validate()

> **validate**(`index`): `object` \| `object`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`object` \| `object`

#### Defined in

[packages/client/src/FormML.ts:218](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L218)

---

### validateAll()

> **validateAll**(): `ValidationResult`

#### Returns

`ValidationResult`

#### Defined in

[packages/client/src/FormML.ts:241](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/FormML.ts#L241)
