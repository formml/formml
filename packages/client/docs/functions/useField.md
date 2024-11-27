[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useField

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

[packages/client/src/useField.ts:126](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/useField.ts#L126)
