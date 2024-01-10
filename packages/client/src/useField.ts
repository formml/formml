import { Field } from '@formml/dsl'
import { type DeepReadonly } from '@vue/reactivity'
import { useCallback, useMemo } from 'react'
import { useSyncExternalStore } from 'use-sync-external-store/shim'

import { FieldResult, type PrimitivesRuntimeTypesUnion } from './FormML.js'
import useFormMLContext from './useFormMLContext.js'
import createMemoSelector from './utils/createMemoSelector.js'

export type FieldProps = {
  name: string
  onBlur: React.FocusEventHandler
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
}

export type FieldMetaData = {
  error: undefined
  schema: Field
  touched: boolean
  typedValue: PrimitivesRuntimeTypesUnion | undefined
}

export type FieldHelpers = {
  commitRawValue: () => void
  setRawValue: (value: string) => void
  setTypedValue: (value: PrimitivesRuntimeTypesUnion) => void
  touch: () => void
}

export type FieldPack = {
  field: FieldProps
  helpers: FieldHelpers
  meta: FieldMetaData
}

export type FieldPackReadonly = DeepReadonly<FieldPack>

const selectFieldPack = createMemoSelector(
  (
    commitRawValue: FieldResult['commitRawValue'],
    error: FieldResult['error'],
    rawValue: FieldResult['rawValue'],
    schema: FieldResult['schema'],
    setRawValue: FieldResult['setRawValue'],
    setValue: FieldResult['setValue'],
    touch: FieldResult['touch'],
    touched: FieldResult['touched'],
    value: FieldResult['value'],
  ): FieldPackReadonly => ({
    field: {
      name: schema.name,
      onBlur: (e) => {
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
      setTypedValue: setValue,
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

export default function useField(index: object): FieldPackReadonly {
  const formML = useFormMLContext()
  useMemo(() => formML.initField(index), [formML, index])

  return useSyncExternalStore(
    useCallback((cb) => formML.subscribe(index, cb), [formML, index]),
    () => {
      const field = formML.getField(index)
      return selectFieldPack(
        field.commitRawValue,
        field.error,
        field.rawValue,
        field.schema,
        field.setRawValue,
        field.setValue,
        field.touch,
        field.touched,
        field.value,
      )
    },
  )
}
