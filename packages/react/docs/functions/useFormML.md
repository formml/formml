[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / useFormML

# Function: useFormML()

> **useFormML**\<`T`\>(`schema`, `options`?): [`FormMLPack`](../interfaces/FormMLPack.md)\<`T`\>

Hook to create and manage a FormML instance

## Type Parameters

• **T** _extends_ `FormMLSchema`

## Parameters

• **schema**: `T`

The FormML schema

• **options?**: `DeepPartial`\<`FormMLOptions`\>

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

[packages/react/src/useFormML.tsx:88](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useFormML.tsx#L88)
