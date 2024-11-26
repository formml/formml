[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / ErrorMessage

# Function: ErrorMessage()

A React component that displays validation error messages for bound form field

## Param

Component props

## Param

The field index to bind to

## Param

Optional HTML element name to render the error message with

## Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage $bind={$form.email} as="div" className="error" />
```

## ErrorMessage(props)

> **ErrorMessage**(`props`): `ReactNode`

A React component that displays validation error messages for bound form field

### Parameters

• **props**

• **props.$bind**: `BaseIndex`

### Returns

`ReactNode`

### Param

Component props

### Param

The field index to bind to

### Param

Optional HTML element name to render the error message with

### Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage $bind={$form.email} as="div" className="error" />
```

### Defined in

[packages/client/src/ErrorMessage.tsx:51](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/ErrorMessage.tsx#L51)

## ErrorMessage(props)

> **ErrorMessage**\<`TElementName`\>(`props`): `ReactNode`

A React component that displays validation error messages for bound form field

### Type Parameters

• **TElementName** _extends_ keyof `ReactHTML`

### Parameters

• **props**: `object` & `ComponentPropsWithRef`\<`TElementName`\>

### Returns

`ReactNode`

### Param

Component props

### Param

The field index to bind to

### Param

Optional HTML element name to render the error message with

### Example

```tsx
// Returns string directly if no `as` prop was given
<span><ErrorMessage $bind={$form.email} /></span>

// Returns div, accepting any other props that div can take
<ErrorMessage $bind={$form.email} as="div" className="error" />
```

### Defined in

[packages/client/src/ErrorMessage.tsx:51](https://github.com/formml/formml/blob/6aacaa756f672e3d18c3bdf35091d08edefd594c/packages/client/src/ErrorMessage.tsx#L51)
