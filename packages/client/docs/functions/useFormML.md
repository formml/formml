[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useFormML

# Function: useFormML()

> **useFormML**\<`T`\>(...`props`): `object`

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Parameters

• ...**props**: [`T`, `DeepPartial`\<[`FormMLOptions`](../type-aliases/FormMLOptions.md)\>]

## Returns

`object`

### $form

> **$form**: `IndexRoot`\<`T`\>

### FormML()

> **FormML**: (`props`) => `Element` = `FormMLWrapper`

#### Parameters

• **props**

• **props.children?**: `ReactNode`

#### Returns

`Element`

### handleSubmit()

> **handleSubmit**: (`onSubmit`, `onError`?) => `FormEventHandler`\<`HTMLFormElement`\>

#### Parameters

• **onSubmit**: [`SubmitHandler`](../type-aliases/SubmitHandler.md)

• **onError?**: [`SubmitErrorHandler`](../type-aliases/SubmitErrorHandler.md)

#### Returns

`FormEventHandler`\<`HTMLFormElement`\>

### instance

> **instance**: [`FormML`](../classes/FormML.md)\<`T`\> = `formML`

## Defined in

[packages/client/src/useFormML.tsx:24](https://github.com/formml/formml/blob/5c707903361ee929472a81de07fd0204242687ee/packages/client/src/useFormML.tsx#L24)