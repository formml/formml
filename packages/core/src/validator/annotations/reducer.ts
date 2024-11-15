import type { utils } from '@formml/dsl'
import type annotationsInterface from '@formml/dsl/interfaces/annotations.js'
import type { GenericSchema } from 'valibot'

import { assertNever } from '@formml/utils'

import { reducerImpl } from './impl/index.js'

type IAnnotations = typeof annotationsInterface

export type IAnnotationActions = {
  [key in keyof IAnnotations]: {
    name: key
    options: utils.ArgsData<IAnnotations[key]>
  }
}

export type IAnnotationAction<
  TName extends keyof IAnnotationActions = keyof IAnnotationActions,
> = IAnnotationActions[TName]

export type IAnnotationReducer<
  TName extends keyof IAnnotationActions = keyof IAnnotationActions,
> = (schema: GenericSchema, action: IAnnotationAction<TName>) => GenericSchema

export function annotationsReducer(
  schema: GenericSchema,
  action: IAnnotationAction,
): GenericSchema {
  const impl = reducerImpl[action.name] as IAnnotationReducer // makes TS happy
  if (impl) {
    return impl(schema, action)
  }
  return assertNever`Unknown annotation "${action.name as never}".`
}
