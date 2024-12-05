[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / useField

# Function: useField()

> **useField**(`index`): [`FieldPack`](../interfaces/FieldPack.md)

Hook to access field state and helpers.

## Parameters

• **index**: `BaseIndex`

The field index to bind to

## Returns

[`FieldPack`](../interfaces/FieldPack.md)

Object containing field props, metadata and helper functions

## Remarks

It's based on a subscribing-pushing mechanism. Component will only rerender when the watching states change.

## Example

```tsx
function MyInput({ $bind }: { $bind: BaseIndex }) {
  const { field } = useField($bind)
  return <input {...field} /> // includes name, value, onChange, onBlur
}
```

## Defined in

[packages/react/src/useField.ts:124](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/useField.ts#L124)
