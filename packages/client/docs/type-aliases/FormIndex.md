[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / FormIndex

# Type Alias: FormIndex\<TChildren\>

> **FormIndex**\<`TChildren`\>: `BaseFormIndex` & `TChildren`

Form index that contains given child field indexes

## Type Parameters

• **TChildren** _extends_ `Record`\<`string`, [`BaseIndex`](../interfaces/BaseIndex.md)\> = `Record`\<`string`, [`GenericIndex`](../interfaces/GenericIndex.md)\>

Record of child field indexes, defaults to record of `GenericIndex`es

## Example

```ts
type UserForm = FormIndex<{
  name: TextIndex
  age: NumIndex
}>
```

## Defined in

[IndexManager.ts:40](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/client/src/IndexManager.ts#L40)
