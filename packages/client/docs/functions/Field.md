[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / Field

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

[packages/client/src/Field.tsx:96](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/Field.tsx#L96)
