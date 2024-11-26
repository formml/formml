[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useField

# Function: useField()

> **useField**(`index`): [`FieldPack`](../type-aliases/FieldPack.md)

Hook to access field state and helpers.

_It's based on a subscribing-pushing mechanism. Component will only rerender when the watching states change._

## Parameters

• **index**: `BaseIndex`

The field index to bind to

## Returns

[`FieldPack`](../type-aliases/FieldPack.md)

Object containing field props, metadata and helper functions

## Example

```tsx
function MyInput({ $bind }: { $bind: BaseIndex }) {
  const { field } = useField($bind)
  return <input {...field} /> // includes name, value, onChange, onBlur
}
```

## Defined in

[packages/client/src/useField.ts:94](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/useField.ts#L94)
