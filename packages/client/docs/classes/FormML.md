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

[packages/client/src/FormML.ts:86](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L86)

## Properties

### options

> `readonly` **options**: [`FormMLOptions`](../type-aliases/FormMLOptions.md)

#### Defined in

[packages/client/src/FormML.ts:84](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L84)

## Accessors

### indexRoot

#### Get Signature

> **get** **indexRoot**(): `IndexRoot`\<`T`\>

##### Returns

`IndexRoot`\<`T`\>

#### Defined in

[packages/client/src/FormML.ts:250](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L250)

## Methods

### blur()

> **blur**(`index`): `void`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:133](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L133)

---

### commitRawValue()

> **commitRawValue**(`index`): `void`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:140](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L140)

---

### getField()

> **getField**(`index`): [`FieldResult`](../type-aliases/FieldResult.md)

#### Parameters

• **index**: `BaseIndex`

#### Returns

[`FieldResult`](../type-aliases/FieldResult.md)

#### Defined in

[packages/client/src/FormML.ts:148](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L148)

---

### getTypedData()

> **getTypedData**(): `Record`\<`string`, `PrimitiveType`\>

#### Returns

`Record`\<`string`, `PrimitiveType`\>

#### Defined in

[packages/client/src/FormML.ts:163](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L163)

---

### setRawValue()

> **setRawValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `string`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:168](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L168)

---

### setTypedValue()

> **setTypedValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:176](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L176)

---

### setValue()

> **setValue**(`index`, `value`): `void`

#### Parameters

• **index**: `BaseIndex`

• **value**: `PrimitiveType`

#### Returns

`void`

#### Defined in

[packages/client/src/FormML.ts:185](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L185)

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

[packages/client/src/FormML.ts:193](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L193)

---

### validate()

> **validate**(`index`): `object` \| `object`

#### Parameters

• **index**: `BaseIndex`

#### Returns

`object` \| `object`

#### Defined in

[packages/client/src/FormML.ts:208](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L208)

---

### validateAll()

> **validateAll**(): `ValidationResult`

#### Returns

`ValidationResult`

#### Defined in

[packages/client/src/FormML.ts:231](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/FormML.ts#L231)
