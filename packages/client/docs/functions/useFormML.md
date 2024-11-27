[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useFormML

# Function: useFormML()

> **useFormML**\<`T`\>(`schema`, `options`?): [`FormMLPack`](../interfaces/FormMLPack.md)\<`T`\>

Hook to create and manage a FormML instance

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Parameters

• **schema**: `T`

The FormML schema

• **options?**: `DeepPartial`\<[`FormMLOptions`](../type-aliases/FormMLOptions.md)\>

Optional FormML configurations

## Returns

[`FormMLPack`](../interfaces/FormMLPack.md)\<`T`\>

Object containing fields index root, FormML instance and helper components/functions

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

[packages/client/src/useFormML.tsx:89](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useFormML.tsx#L89)
