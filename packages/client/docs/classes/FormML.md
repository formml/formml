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

[FormML.ts:96](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L96)

## Properties

### options

> `readonly` **options**: [`FormMLOptions`](../type-aliases/FormMLOptions.md)

#### Defined in

[FormML.ts:94](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L94)

## Accessors

### indexRoot

#### Get Signature

> **get** **indexRoot**(): [`IndexRoot`](../type-aliases/IndexRoot.md)\<`T`\>

##### Returns

[`IndexRoot`](../type-aliases/IndexRoot.md)\<`T`\>

#### Defined in

[FormML.ts:260](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L260)

## Methods

### blur()

> **blur**(`index`): `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

#### Returns

`void`

#### Defined in

[FormML.ts:143](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L143)

---

### commitRawValue()

> **commitRawValue**(`index`): `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

#### Returns

`void`

#### Defined in

[FormML.ts:150](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L150)

---

### getField()

> **getField**(`index`): [`FieldResult`](../type-aliases/FieldResult.md)

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

#### Returns

[`FieldResult`](../type-aliases/FieldResult.md)

#### Defined in

[FormML.ts:158](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L158)

---

### getTypedData()

> **getTypedData**(): `Record`\<`string`, `PrimitiveType`\>

#### Returns

`Record`\<`string`, `PrimitiveType`\>

#### Defined in

[FormML.ts:173](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L173)

---

### setRawValue()

> **setRawValue**(`index`, `value`): `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

• **value**: `string`

#### Returns

`void`

#### Defined in

[FormML.ts:178](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L178)

---

### setTypedValue()

> **setTypedValue**(`index`, `value`): `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[FormML.ts:186](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L186)

---

### setValue()

> **setValue**(`index`, `value`): `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[FormML.ts:195](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L195)

---

### subscribe()

> **subscribe**(`index`, `callback`): () => `void`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

• **callback**

#### Returns

`Function`

##### Returns

`void`

#### Defined in

[FormML.ts:203](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L203)

---

### validate()

> **validate**(`index`): `object` \| `object`

#### Parameters

• **index**: [`BaseIndex`](../interfaces/BaseIndex.md)

#### Returns

`object` \| `object`

#### Defined in

[FormML.ts:218](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L218)

---

### validateAll()

> **validateAll**(): `ValidationResult`

#### Returns

`ValidationResult`

#### Defined in

[FormML.ts:241](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/FormML.ts#L241)
