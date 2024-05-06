import { Field } from '@formml/dsl'
import { type DeepReadonly } from '@vue/reactivity'
import { useCallback, useMemo } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import type { FieldResult } from './FormML.js'
import type { PrimitiveType } from './JsTypes.js'
import type { ValidationError } from './validator/index.js'

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
  typedValue: PrimitiveType
}

export type FieldHelpers = {
  commitRawValue: () => void
  setRawValue: (value: string) => void
  setTypedValue: (value: PrimitiveType) => void
  touch: () => void
}

export type FieldPack = {
  field: FieldProps
  helpers: FieldHelpers
  meta: FieldMetaData
}

export type FieldPackReadonly = DeepReadonly<FieldPack>

const selectFieldPackByIndex = createMemoSelectorGrouper(
  (
    commitRawValue: FieldResult['commitRawValue'],
    error: FieldResult['error'],
    rawValue: FieldResult['rawValue'],
    schema: FieldResult['schema'],
    setRawValue: FieldResult['setRawValue'],
    setTypedValue: FieldResult['setTypedValue'],
    touch: FieldResult['touch'],
    touched: FieldResult['touched'],
    value: FieldResult['value'],
  ): FieldPackReadonly => ({
    field: {
      name: schema.name,
      onBlur: () => {
        touch()
        commitRawValue()
      },
      onChange: (e) => {
        setRawValue(e.target.value)
      },
      value: rawValue,
    },
    helpers: {
      commitRawValue,
      setRawValue,
      setTypedValue,
      touch,
    },
    meta: {
      error,
      schema,
      touched,
      typedValue: value,
    },
  }),
)

export function useField(index: object): FieldPackReadonly {
  const formML = useFormMLContext()
  useMemo(() => formML.initField(index), [formML, index])

  return useSyncExternalStore(
    useCallback((cb) => formML.subscribe(index, cb), [formML, index]),
    () => {
      const field = formML.getField(index)
      return selectFieldPackByIndex(index)(
        field.commitRawValue,
        field.error,
        field.rawValue,
        field.schema,
        field.setRawValue,
        field.setTypedValue,
        field.touch,
        field.touched,
        field.value,
      )
    },
  )
}
