[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / Field

# Function: Field()

> **Field**(`props`): `ReactNode`

A smart field component that displays the bound form field with appropriate default settings.

## Parameters

• **props**: [`InputFieldProps`](../interfaces/InputFieldProps.md) \| [`TextAreaFieldProps`](../interfaces/TextAreaFieldProps.md) & `RefAttributes`\<`HTMLInputElement` \| `HTMLTextAreaElement`\>

## Returns

`ReactNode`

A controlled form `input`/`textarea` element

## Remarks

The Default Settings refer to a batch of HTML attributes inferred by a heuristic algorithm. You can override them anytime you like.

## Param

Component props

## Example

```tsx
// usual text input
<Field $bind={$form.text} />

// textarea
<Field $bind={$form.bio} as="textarea" />

// displays as a checkbox
<Field $bind={$form.bool} />

// type="number"
<Field $bind={$form.num} />

// type="datetime-local"
<Field $bind={$form.datetime} />

// accepts any other props that input can take
<Field
  $bind={$form.email}
  type="email"
  className="email"
  ref={myRef}
/>
```

## Defined in

[packages/react/src/Field.tsx:96](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/Field.tsx#L96)
