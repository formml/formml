[**@formml/core**](../../../README.md) • **Docs**

---

[@formml/core](../../../globals.md) / [JSType](../README.md) / schemas

# Variable: schemas

> `const` **schemas**: `object`

## Type declaration

### bool

> **bool**: `BooleanSchema`\<`undefined`\>

### datetime

> **datetime**: `UnionSchema`\<[`SchemaWithPipe`\<[`StringSchema`\<`undefined`\>, `IsoDateTimeAction`\<`string`, `undefined`\>]\>, `DateSchema`\<`undefined`\>], `undefined`\>

### decimal

> **decimal**: `UnionSchema`\<[`SchemaWithPipe`\<[`StringSchema`\<`undefined`\>, `NumericalAction`\<`string`, `undefined`\>]\>, `InstanceSchema`\<_typeof_ `BigNumber`, `undefined`\>], `undefined`\>

### num

> **num**: `NumberSchema`\<`undefined`\>

### text

> **text**: `StringSchema`\<`undefined`\>

## Defined in

[js-type/plain/validation.ts:5](https://github.com/formml/formml/blob/fed46848d8032d8aeab7f7fad75fbc02dc65656a/packages/core/src/js-type/plain/validation.ts#L5)
