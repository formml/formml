[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / Field

# Function: Field()

> **Field**(`props`): `ReactNode`

A smart field component that displays the bound form field with appropriate default settings.

_The Default Settings refer to a batch of HTML attributes inferred by a heuristic algorithm. You can override them anytime you like._

## Parameters

• **props**: `Props` & `RefAttributes`\<`HTMLInputElement` \| `HTMLTextAreaElement`\>

## Returns

`ReactNode`

A controlled form `input`/`textarea` element

## Param

Component props

## Param

The field index to bind to

## Param

Optional HTML element name to render the field with, defaults to `input`

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

[packages/client/src/Field.tsx:89](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/Field.tsx#L89)
