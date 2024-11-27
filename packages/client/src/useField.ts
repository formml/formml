import type { JSType, ValidationError } from '@formml/core'
import type { Field } from '@formml/dsl'

import { useCallback } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import type { FieldResult } from './FormML.js'
import type { BaseIndex } from './IndexManager.js'

import { useFormMLContext } from './useFormMLContext.js'
import { createMemoSelectorGrouper } from './utils/createMemoSelectorGrouper.js'

export interface FieldProps {
  /** Field name */
  name: string
  /** Field blur event handler */
  onBlur: React.FocusEventHandler
  /** Field change event handler */
  onChange: React.ChangeEventHandler<HTMLElement & { value: string }>
  /** Field raw value */
  value: string
}

export interface FieldMetaData {
  /** Field error */
  error: ValidationError | undefined
  /** FormML schema used to create the field */
  schema: Field
  /** Whether the field has been touched */
  touched: boolean
  /** Field typed value */
  typedValue: JSType.PrimitiveType
}

export interface FieldHelpers {
  /**
   * Marks the field as touched, indicating user interaction
   */
  blur(): void

  /**
   * Commits the current raw string value to storage, converting it to the field's type and triggering post-processes.
   * Usually used together with {@link setRawValue}.
   * @example
   * ```ts
   * field.helpers.setRawValue("123")
   * field.helpers.commitRawValue() // Converts string "123" to number 123 for `num` fields
   * ```
   */
  commitRawValue(): void

  /**
   * Sets the raw string value to represent user input, without any post-processes.
   * @param value - The string value to set
   */
  setRawValue(value: string): void

  /**
   * Sets the typed value directly into storage, triggering post-processes.
   * @param value - The typed value matching the field's type
   */
  setTypedValue(value: JSType.PrimitiveType): void
}

export interface FieldPack {
  /** Field props for creating a HTML element */
  field: FieldProps
  /** Field helper functions */
  helpers: FieldHelpers
  /** Field states & metadata */
  meta: FieldMetaData
}

const selectFieldPackByIndex = createMemoSelectorGrouper(
  (
    blur: FieldResult['blur'],
    commitRawValue: FieldResult['commitRawValue'],
    error: FieldResult['error'],
    rawValue: FieldResult['rawValue'],
    schema: FieldResult['schema'],
    setRawValue: FieldResult['setRawValue'],
    setTypedValue: FieldResult['setTypedValue'],
    touched: FieldResult['touched'],
    value: FieldResult['value'],
  ): FieldPack => ({
    field: {
      name: schema.name,
      onBlur: () => {
        blur()
        commitRawValue()
      },
      onChange: (e) => {
        setRawValue(e.target.value)
      },
      value: rawValue,
    },
    helpers: {
      blur,
      commitRawValue,
      setRawValue,
      setTypedValue,
    },
    meta: {
      error,
      schema,
      touched,
      typedValue: value,
    },
  }),
)

/**
 * Hook to access field state and helpers.
 * @remarks
 * It's based on a subscribing-pushing mechanism. Component will only rerender when the watching states change.
 * @param index - The field index to bind to
 * @returns Object containing field props, metadata and helper functions
 * @example
 * ```tsx
 * function MyInput({ $bind }: { $bind: BaseIndex }) {
 *   const { field } = useField($bind)
 *   return <input {...field} /> // includes name, value, onChange, onBlur
 * }
 * ```
 */
export function useField(index: BaseIndex): FieldPack {
  const formML = useFormMLContext()

  return useSyncExternalStore(
    useCallback((cb) => formML.subscribe(index, cb), [formML, index]),
    () => {
      const field = formML.getField(index)
      return selectFieldPackByIndex(index)(
        field.blur,
        field.commitRawValue,
        field.error,
        field.rawValue,
        field.schema,
        field.setRawValue,
        field.setTypedValue,
        field.touched,
        field.value,
      )
    },
  )
}
