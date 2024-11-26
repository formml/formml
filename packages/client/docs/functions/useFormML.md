[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useFormML

# Function: useFormML()

> **useFormML**\<`T`\>(...`props`): `object`

Hook to create and manage a FormML instance

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Parameters

• ...**props**: [`T`, `DeepPartial`\<[`FormMLOptions`](../type-aliases/FormMLOptions.md)\>]

## Returns

`object`

Object containing fields index root, FormML instance and helper components/functions

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

## Example

```tsx
const { $form, FormML, handleSubmit } = useFormML(schema)

const onSubmit = handleSubmit((data) => {
  console.log(data)
})

return (
  <FormML>
    <form onSubmit={onSubmit}>
      <Field $bind={$form.email} />
      <Field $bind={$form.password} />
      <button>Submit</button>
    </form>
  </FormML>
)
```

## Defined in

[packages/client/src/useFormML.tsx:50](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/useFormML.tsx#L50)
