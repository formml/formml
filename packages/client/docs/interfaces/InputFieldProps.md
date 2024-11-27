[**@formml/client**](../README.md) • **Docs**

---

[@formml/client](../globals.md) / InputFieldProps

# Interface: InputFieldProps

## Extends

- [`BaseFieldProps`](BaseFieldProps.md).`ComponentPropsWithoutRef`\<`"input"`\>

## Properties

### $bind

> **$bind**: `BaseIndex`

The field index to bind to

#### Inherited from

[`BaseFieldProps`](BaseFieldProps.md).[`$bind`](BaseFieldProps.md#$bind)

#### Defined in

[packages/client/src/Field.tsx:47](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/Field.tsx#L47)

---

### about?

> `optional` **about**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.about`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1993

---

### accept?

> `optional` **accept**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.accept`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2361

---

### accessKey?

> `optional` **accessKey**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.accessKey`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1968

---

### alt?

> `optional` **alt**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.alt`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2362

---

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-activedescendant`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1666

---

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-atomic`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1668

---

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"inline"` \| `"none"` \| `"list"` \| `"both"`

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-autocomplete`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1673

---

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-braillelabel`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1679

---

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-brailleroledescription`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1684

---

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

#### Inherited from

`React.ComponentPropsWithoutRef.aria-busy`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1685

---

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

- aria-pressed
- aria-selected.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-checked`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1690

---

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-colcount`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1695

---

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

- aria-colcount
- aria-colspan.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-colindex`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1700

---

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-colindextext`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1705

---

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

- aria-colindex
- aria-rowspan.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-colspan`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1710

---

### aria-controls?

> `optional` **aria-controls**: `string`

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-controls`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1715

---

### aria-current?

> `optional` **aria-current**: `boolean` \| `"true"` \| `"time"` \| `"step"` \| `"date"` \| `"false"` \| `"page"` \| `"location"`

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-current`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1717

---

### aria-describedby?

> `optional` **aria-describedby**: `string`

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`React.ComponentPropsWithoutRef.aria-describedby`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1722

---

### aria-description?

> `optional` **aria-description**: `string`

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-description`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1727

---

### aria-details?

> `optional` **aria-details**: `string`

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-details`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1732

---

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

- aria-hidden
- aria-readonly.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-disabled`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1737

---

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"copy"` \| `"link"` \| `"none"` \| `"execute"` \| `"move"` \| `"popup"`

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`React.ComponentPropsWithoutRef.aria-dropeffect`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1742

---

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Identifies the element that provides an error message for the object.

#### See

- aria-invalid
- aria-describedby.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-errormessage`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1747

---

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-expanded`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1749

---

### aria-flowto?

> `optional` **aria-flowto**: `string`

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-flowto`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1754

---

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`React.ComponentPropsWithoutRef.aria-grabbed`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1759

---

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"true"` \| `"dialog"` \| `"menu"` \| `"false"` \| `"grid"` \| `"listbox"` \| `"tree"`

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-haspopup`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1761

---

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-hidden`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1766

---

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-invalid`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1771

---

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-keyshortcuts`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1773

---

### aria-label?

> `optional` **aria-label**: `string`

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-label`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1778

---

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-labelledby`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1783

---

### aria-level?

> `optional` **aria-level**: `number`

Defines the hierarchical level of an element within a structure.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-level`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1785

---

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-live`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1787

---

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Indicates whether an element is modal when displayed.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-modal`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1789

---

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-multiline`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1791

---

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-multiselectable`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1793

---

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-orientation`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1795

---

### aria-owns?

> `optional` **aria-owns**: `string`

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-owns`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1801

---

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-placeholder`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1806

---

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-posinset`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1811

---

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Indicates the current "pressed" state of toggle buttons.

#### See

- aria-checked
- aria-selected.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-pressed`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1816

---

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-readonly`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1821

---

### aria-relevant?

> `optional` **aria-relevant**: `"text"` \| `"all"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-relevant`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1826

---

### aria-required?

> `optional` **aria-required**: `Booleanish`

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-required`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1839

---

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-roledescription`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1841

---

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-rowcount`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1846

---

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

- aria-rowcount
- aria-rowspan.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-rowindex`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1851

---

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-rowindextext`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1856

---

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

- aria-rowindex
- aria-colspan.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-rowspan`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1861

---

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Indicates the current "selected" state of various widgets.

#### See

- aria-checked
- aria-pressed.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-selected`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1866

---

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-setsize`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1871

---

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-sort`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1873

---

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defines the maximum allowed value for a range widget.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-valuemax`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1875

---

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defines the minimum allowed value for a range widget.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-valuemin`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1877

---

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-valuenow`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1882

---

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`React.ComponentPropsWithoutRef.aria-valuetext`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1884

---

### as?

> `optional` **as**: `"input"`

Optional HTML element name to render the field with, defaults to `input`

#### Defined in

[packages/client/src/Field.tsx:54](https://github.com/formml/formml/blob/72da07b448131bd3f04929d1b1f639a533f113d9/packages/client/src/Field.tsx#L54)

---

### autoCapitalize?

> `optional` **autoCapitalize**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.autoCapitalize`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2006

---

### autoComplete?

> `optional` **autoComplete**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.autoComplete`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2363

---

### autoCorrect?

> `optional` **autoCorrect**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.autoCorrect`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2007

---

### autoFocus?

> `optional` **autoFocus**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.autoFocus`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1969

---

### autoSave?

> `optional` **autoSave**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.autoSave`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2008

---

### capture?

> `optional` **capture**: `boolean` \| `"environment"` \| `"user"`

#### Inherited from

`React.ComponentPropsWithoutRef.capture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2364

---

### checked?

> `optional` **checked**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.checked`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2365

---

### children?

> `optional` **children**: `ReactNode`

#### Inherited from

`React.ComponentPropsWithoutRef.children`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1450

---

### className?

> `optional` **className**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.className`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1970

---

### color?

> `optional` **color**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.color`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2009

---

### content?

> `optional` **content**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.content`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1994

---

### contentEditable?

> `optional` **contentEditable**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

#### Inherited from

`React.ComponentPropsWithoutRef.contentEditable`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1971

---

### contextMenu?

> `optional` **contextMenu**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.contextMenu`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1972

---

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`React.ComponentPropsWithoutRef.dangerouslySetInnerHTML`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1451

---

### datatype?

> `optional` **datatype**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.datatype`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1995

---

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.defaultChecked`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1962

---

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`React.ComponentPropsWithoutRef.defaultValue`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1963

---

### dir?

> `optional` **dir**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.dir`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1973

---

### disabled?

> `optional` **disabled**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.disabled`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2366

---

### draggable?

> `optional` **draggable**: `Booleanish`

#### Inherited from

`React.ComponentPropsWithoutRef.draggable`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1974

---

### enterKeyHint?

> `optional` **enterKeyHint**: `"search"` \| `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"send"`

#### Inherited from

`React.ComponentPropsWithoutRef.enterKeyHint`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2367

---

### form?

> `optional` **form**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.form`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2368

---

### formAction?

> `optional` **formAction**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.formAction`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2369

---

### formEncType?

> `optional` **formEncType**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.formEncType`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2375

---

### formMethod?

> `optional` **formMethod**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.formMethod`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2376

---

### formNoValidate?

> `optional` **formNoValidate**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.formNoValidate`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2377

---

### formTarget?

> `optional` **formTarget**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.formTarget`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2378

---

### height?

> `optional` **height**: `string` \| `number`

#### Inherited from

`React.ComponentPropsWithoutRef.height`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2379

---

### hidden?

> `optional` **hidden**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.hidden`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1975

---

### id?

> `optional` **id**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.id`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1976

---

### inlist?

> `optional` **inlist**: `any`

#### Inherited from

`React.ComponentPropsWithoutRef.inlist`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1996

---

### inputMode?

> `optional` **inputMode**: `"text"` \| `"decimal"` \| `"search"` \| `"none"` \| `"email"` \| `"tel"` \| `"url"` \| `"numeric"`

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute

#### Inherited from

`React.ComponentPropsWithoutRef.inputMode`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2024

---

### is?

> `optional` **is**: `string`

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is

#### Inherited from

`React.ComponentPropsWithoutRef.is`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2029

---

### itemID?

> `optional` **itemID**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.itemID`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2013

---

### itemProp?

> `optional` **itemProp**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.itemProp`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2010

---

### itemRef?

> `optional` **itemRef**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.itemRef`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2014

---

### itemScope?

> `optional` **itemScope**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.itemScope`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2011

---

### itemType?

> `optional` **itemType**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.itemType`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2012

---

### key?

> `optional` **key**: `null` \| `Key`

#### Inherited from

`React.ComponentPropsWithoutRef.key`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:109

---

### lang?

> `optional` **lang**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.lang`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1977

---

### list?

> `optional` **list**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.list`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2380

---

### max?

> `optional` **max**: `string` \| `number`

#### Inherited from

`React.ComponentPropsWithoutRef.max`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2381

---

### maxLength?

> `optional` **maxLength**: `number`

#### Inherited from

`React.ComponentPropsWithoutRef.maxLength`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2382

---

### min?

> `optional` **min**: `string` \| `number`

#### Inherited from

`React.ComponentPropsWithoutRef.min`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2383

---

### minLength?

> `optional` **minLength**: `number`

#### Inherited from

`React.ComponentPropsWithoutRef.minLength`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2384

---

### multiple?

> `optional` **multiple**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.multiple`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2385

---

### name?

> `optional` **name**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.name`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2386

---

### nonce?

> `optional` **nonce**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.nonce`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1978

---

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAbort`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1510

---

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAbortCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1511

---

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationEnd`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1642

---

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationEndCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1643

---

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationIteration`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1644

---

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationIterationCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1645

---

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationStart`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1640

---

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAnimationStartCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1641

---

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAuxClick`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1558

---

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onAuxClickCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1559

---

### onBeforeInput?

> `optional` **onBeforeInput**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onBeforeInput`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1482

---

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onBeforeInputCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1483

---

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onBlur`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1476

---

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onBlurCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1477

---

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCanPlay`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1512

---

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCanPlayCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1513

---

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCanPlayThrough`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1514

---

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCanPlayThroughCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1515

---

### onChange?

> `optional` **onChange**: `ChangeEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onChange`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2398

---

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onChangeCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1481

---

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onClick`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1560

---

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onClickCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1561

---

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionEnd`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1466

---

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionEndCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1467

---

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionStart`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1468

---

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionStartCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1469

---

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionUpdate`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1470

---

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCompositionUpdateCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1471

---

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onContextMenu`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1562

---

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onContextMenuCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1563

---

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCopy`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1458

---

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCopyCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1459

---

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCut`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1460

---

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onCutCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1461

---

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDoubleClick`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1564

---

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDoubleClickCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1565

---

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDrag`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1566

---

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1567

---

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragEnd`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1568

---

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragEndCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1569

---

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragEnter`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1570

---

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragEnterCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1571

---

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragExit`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1572

---

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragExitCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1573

---

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragLeave`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1574

---

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragLeaveCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1575

---

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragOver`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1576

---

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragOverCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1577

---

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragStart`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1578

---

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDragStartCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1579

---

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDrop`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1580

---

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDropCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1581

---

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDurationChange`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1516

---

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onDurationChangeCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1517

---

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEmptied`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1518

---

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEmptiedCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1519

---

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEncrypted`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1520

---

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEncryptedCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1521

---

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEnded`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1522

---

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onEndedCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1523

---

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onError`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1496

---

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onErrorCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1497

---

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onFocus`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1474

---

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onFocusCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1475

---

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onGotPointerCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1626

---

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onGotPointerCaptureCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1627

---

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onInput`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1484

---

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onInputCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1485

---

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onInvalid`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1490

---

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onInvalidCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1491

---

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyDown`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1500

---

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyDownCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1501

---

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Deprecated

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyPress`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1503

---

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Deprecated

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyPressCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1505

---

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyUp`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1506

---

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onKeyUpCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1507

---

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoad`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1494

---

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1495

---

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadedData`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1524

---

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadedDataCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1525

---

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadedMetadata`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1526

---

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadedMetadataCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1527

---

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadStart`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1528

---

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLoadStartCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1529

---

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLostPointerCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1628

---

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onLostPointerCaptureCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1629

---

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseDown`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1582

---

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseDownCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1583

---

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseEnter`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1584

---

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseLeave`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1585

---

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseMove`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1586

---

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseMoveCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1587

---

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseOut`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1588

---

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseOutCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1589

---

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseOver`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1590

---

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseOverCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1591

---

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseUp`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1592

---

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onMouseUpCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1593

---

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPaste`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1462

---

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPasteCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1463

---

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPause`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1530

---

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPauseCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1531

---

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPlay`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1532

---

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPlayCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1533

---

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPlaying`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1534

---

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPlayingCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1535

---

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerCancel`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1616

---

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerCancelCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1617

---

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerDown`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1610

---

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerDownCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1611

---

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerEnter`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1618

---

### onPointerEnterCapture?

> `optional` **onPointerEnterCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerEnterCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1619

---

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerLeave`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1620

---

### onPointerLeaveCapture?

> `optional` **onPointerLeaveCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerLeaveCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1621

---

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerMove`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1612

---

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerMoveCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1613

---

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerOut`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1624

---

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerOutCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1625

---

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerOver`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1622

---

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerOverCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1623

---

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerUp`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1614

---

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onPointerUpCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1615

---

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onProgress`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1536

---

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onProgressCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1537

---

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onRateChange`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1538

---

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onRateChangeCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1539

---

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onReset`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1486

---

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onResetCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1487

---

### onResize?

> `optional` **onResize**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onResize`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1540

---

### onResizeCapture?

> `optional` **onResizeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onResizeCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1541

---

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onScroll`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1632

---

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onScrollCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1633

---

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSeeked`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1542

---

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSeekedCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1543

---

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSeeking`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1544

---

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSeekingCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1545

---

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSelect`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1596

---

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSelectCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1597

---

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onStalled`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1546

---

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onStalledCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1547

---

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSubmit`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1488

---

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSubmitCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1489

---

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSuspend`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1548

---

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onSuspendCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1549

---

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTimeUpdate`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1550

---

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTimeUpdateCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1551

---

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchCancel`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1600

---

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchCancelCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1601

---

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchEnd`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1602

---

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchEndCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1603

---

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchMove`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1604

---

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchMoveCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1605

---

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchStart`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1606

---

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTouchStartCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1607

---

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTransitionEnd`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1648

---

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onTransitionEndCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1649

---

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onVolumeChange`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1552

---

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onVolumeChangeCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1553

---

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onWaiting`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1554

---

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onWaitingCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1555

---

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onWheel`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1636

---

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLInputElement`\>

#### Inherited from

`React.ComponentPropsWithoutRef.onWheelCapture`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1637

---

### pattern?

> `optional` **pattern**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.pattern`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2387

---

### placeholder?

> `optional` **placeholder**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.placeholder`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2388

---

### prefix?

> `optional` **prefix**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.prefix`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1997

---

### property?

> `optional` **property**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.property`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1998

---

### radioGroup?

> `optional` **radioGroup**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.radioGroup`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1987

---

### readOnly?

> `optional` **readOnly**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.readOnly`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2389

---

### rel?

> `optional` **rel**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.rel`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1999

---

### required?

> `optional` **required**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.required`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2390

---

### resource?

> `optional` **resource**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.resource`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2000

---

### results?

> `optional` **results**: `number`

#### Inherited from

`React.ComponentPropsWithoutRef.results`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2015

---

### rev?

> `optional` **rev**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.rev`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2001

---

### role?

> `optional` **role**: `AriaRole`

#### Inherited from

`React.ComponentPropsWithoutRef.role`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1990

---

### security?

> `optional` **security**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.security`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2016

---

### size?

> `optional` **size**: `number`

#### Inherited from

`React.ComponentPropsWithoutRef.size`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2391

---

### slot?

> `optional` **slot**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.slot`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1979

---

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

#### Inherited from

`React.ComponentPropsWithoutRef.spellCheck`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1980

---

### src?

> `optional` **src**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.src`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2392

---

### step?

> `optional` **step**: `string` \| `number`

#### Inherited from

`React.ComponentPropsWithoutRef.step`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2393

---

### style?

> `optional` **style**: `CSSProperties`

#### Inherited from

`React.ComponentPropsWithoutRef.style`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1981

---

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.suppressContentEditableWarning`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1964

---

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

#### Inherited from

`React.ComponentPropsWithoutRef.suppressHydrationWarning`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1965

---

### tabIndex?

> `optional` **tabIndex**: `number`

#### Inherited from

`React.ComponentPropsWithoutRef.tabIndex`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1982

---

### title?

> `optional` **title**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.title`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1983

---

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

#### Inherited from

`React.ComponentPropsWithoutRef.translate`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:1984

---

### type?

> `optional` **type**: `HTMLInputTypeAttribute`

#### Inherited from

`React.ComponentPropsWithoutRef.type`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2394

---

### typeof?

> `optional` **typeof**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.typeof`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2002

---

### unselectable?

> `optional` **unselectable**: `"on"` \| `"off"`

#### Inherited from

`React.ComponentPropsWithoutRef.unselectable`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2017

---

### value?

> `optional` **value**: `string` \| `number` \| readonly `string`[]

#### Inherited from

`React.ComponentPropsWithoutRef.value`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2395

---

### vocab?

> `optional` **vocab**: `string`

#### Inherited from

`React.ComponentPropsWithoutRef.vocab`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2003

---

### width?

> `optional` **width**: `string` \| `number`

#### Inherited from

`React.ComponentPropsWithoutRef.width`

#### Defined in

node_modules/.pnpm/@types+react@18.2.45/node_modules/@types/react/index.d.ts:2396
