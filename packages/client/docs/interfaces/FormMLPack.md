[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / FormMLPack

# Interface: FormMLPack\<T\>

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Properties

### $form

> **$form**: `InferIndex`\<`T`\[`"form"`\]\>

Index to the form, the root of all child indexes

#### Defined in

[packages/client/src/useFormML.tsx:31](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useFormML.tsx#L31)

---

### FormML

> **FormML**: `FC`\<`object`\>

FormML context provider

#### Type declaration

##### children?

> `optional` **children**: `ReactNode`

#### Defined in

[packages/client/src/useFormML.tsx:33](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useFormML.tsx#L33)

---

### instance

> **instance**: [`FormML`](../classes/FormML.md)\<`T`\>

FormML instance

#### Defined in

[packages/client/src/useFormML.tsx:62](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useFormML.tsx#L62)

## Methods

### handleSubmit()

> **handleSubmit**(`onSubmit`, `onError`?): `FormEventHandler`\<`HTMLFormElement`\>

Creates a submit handler

#### Parameters

• **onSubmit**: [`SubmitHandler`](../type-aliases/SubmitHandler.md)

Callback function called with form data when validation succeeds

• **onError?**: [`SubmitErrorHandler`](../type-aliases/SubmitErrorHandler.md)

Optional callback function called with validation errors when validation fails

#### Returns

`FormEventHandler`\<`HTMLFormElement`\>

Form submit event handler

#### Example

```tsx
const { handleSubmit } = useFormML(schema)
const onSubmit = handleSubmit(
  (data) => {
    console.log('Validation succeeded:', data)
  },
  (errors) => {
    console.log('Validation failed:', errors)
  },
)
return <form onSubmit={onSubmit}>...</form>
```

#### Defined in

[packages/client/src/useFormML.tsx:57](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useFormML.tsx#L57)
