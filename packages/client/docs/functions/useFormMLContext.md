[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / useFormMLContext

# Function: useFormMLContext()

> **useFormMLContext**(): [`FormML`](../classes/FormML.md)\<`FormMLSchema`\>

Hook to access FormML instance from context

## Returns

[`FormML`](../classes/FormML.md)\<`FormMLSchema`\>

FormML instance from nearest provider

## Throws

Error if used outside FormMLProvider

## Example

```tsx
const formML = useFormMLContext()
```

## Defined in

[packages/client/src/useFormMLContext.ts:20](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/useFormMLContext.ts#L20)
