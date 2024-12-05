[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / FormMLPack

# Interface: FormMLPack\<T\>

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Properties

### $form

> **$form**: `InferIndex`\<`T`\[`"form"`\]\>

Index to the form, the root of all child indexes

#### Defined in

[packages/react/src/useFormML.tsx:29](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useFormML.tsx#L29)

---

### FormML

> **FormML**: `FC`\<`object`\>

FormML context provider

#### Type declaration

##### children?

> `optional` **children**: `ReactNode`

#### Defined in

[packages/react/src/useFormML.tsx:31](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useFormML.tsx#L31)

---

### instance

> **instance**: `FormML`\<`T`\>

FormML instance

#### Defined in

[packages/react/src/useFormML.tsx:61](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useFormML.tsx#L61)

## Methods

### handleSubmit()

> **handleSubmit**(`this`, `onSubmit`, `onError`?): `FormEventHandler`\<`HTMLFormElement`\>

Creates a submit handler

#### Parameters

• **this**: `void`

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

[packages/react/src/useFormML.tsx:55](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useFormML.tsx#L55)
