import type { JSType, ValidationError } from '@formml/core'
import type { Field } from '@formml/dsl'

import { useCallback } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import type { FieldResult } from './FormML.js'
import type { BaseIndex } from './IndexManager.js'

import { useFormMLContext } from './useFormMLContext.js'
import { createMemoSelectorGrouper } from './utils/createMemoSelectorGrouper.js'

export type FieldProps = {
  name: string
  onBlur: React.FocusEventHandler
  onChange: React.ChangeEventHandler<HTMLElement & { value: string }>
  value: string
}

export type FieldMetaData = {
  error: ValidationError | undefined
  schema: Field
  touched: boolean
  typedValue: JSType.PrimitiveType
}

export type FieldHelpers = {
  blur: () => void
  commitRawValue: () => void
  setRawValue: (value: string) => void
  setTypedValue: (value: JSType.PrimitiveType) => void
}

export type FieldPack = {
  field: FieldProps
  helpers: FieldHelpers
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
 *
 * *It's based on a subscribing-pushing mechanism. Component will only rerender when the watching states change.*
 *
 * @param index - The field index to bind to
 * @returns Object containing field props, metadata and helper functions
 *
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
