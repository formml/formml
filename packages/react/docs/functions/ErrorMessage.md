[**@formml/react**](../README.md) • **Docs**

---

[@formml/react](../globals.md) / ErrorMessage

# Function: ErrorMessage()

A React component that displays validation error messages for bound form field

## Param

Component props

## Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage
  $bind={$form.email}
  as="div"
  className="error"
  ref={myRef}
/>
```

## ErrorMessage(props)

> **ErrorMessage**(`props`): `ReactNode`

A React component that displays validation error messages for bound form field

### Parameters

• **props**: [`BaseErrorMessageProps`](../interfaces/BaseErrorMessageProps.md)

### Returns

`ReactNode`

### Param

Component props

### Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage
  $bind={$form.email}
  as="div"
  className="error"
  ref={myRef}
/>
```

### Defined in

[packages/react/src/ErrorMessage.tsx:62](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/ErrorMessage.tsx#L62)

## ErrorMessage(props)

> **ErrorMessage**\<`TElementName`\>(`props`): `ReactNode`

A React component that displays validation error messages for bound form field

### Type Parameters

• **TElementName** _extends_ keyof `ReactHTML`

### Parameters

• **props**: [`HTMLElementAsErrorMessageProps`](../interfaces/HTMLElementAsErrorMessageProps.md)\<`TElementName`\> & `ComponentPropsWithRef`\<`TElementName`\>

### Returns

`ReactNode`

### Param

Component props

### Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage
  $bind={$form.email}
  as="div"
  className="error"
  ref={myRef}
/>
```

### Defined in

[packages/react/src/ErrorMessage.tsx:62](https://github.com/formml/formml/blob/527c6e93502cf5114979de3946b0cc8cf0790b3f/packages/react/src/ErrorMessage.tsx#L62)
