import type { FormMLAstType, generics } from '@formml/dsl'
import type * as H from 'hotscript'

// private symbols
const IndexNameSymbol = Symbol('name')
const IndexTypeSymbol = Symbol('type')

export const IndexSymbol = {
  name: IndexNameSymbol,
  type: IndexTypeSymbol,
} as const

/** Base index shape, compatible with any index */
export interface BaseIndex {
  [IndexNameSymbol]: string
  [IndexTypeSymbol]: string
}

/** Unknown index that contains child indexes */
export interface GenericIndex extends BaseIndex {
  [child: string]: GenericIndex
}

/** Base form index shape */
interface BaseFormIndex extends BaseIndex {
  [IndexTypeSymbol]: 'form'
}

/**
 * Form index that contains given child field indexes
 * @template TChildren - Record of child field indexes, defaults to record of `GenericIndex`es
 * @example
 * ```ts
 * type UserForm = FormIndex<{
 *   name: TextIndex
 *   age: NumIndex
 * }>
 * ```
 */
export type FormIndex<
  TChildren extends Record<string, BaseIndex> = Record<string, GenericIndex>,
> = BaseFormIndex & TChildren

/** Text field index */
export interface TextIndex extends BaseIndex {
  [IndexTypeSymbol]: 'text'
}

/** Num field index */
export interface NumIndex extends BaseIndex {
  [IndexTypeSymbol]: 'num'
}

/** Bool field index */
export interface BoolIndex extends BaseIndex {
  [IndexTypeSymbol]: 'bool'
}

/** Datetime field index */
export interface DatetimeIndex extends BaseIndex {
  [IndexTypeSymbol]: 'datetime'
}

/** Decimal field index */
export interface DecimalIndex extends BaseIndex {
  [IndexTypeSymbol]: 'decimal'
}

interface FieldToEntry extends H.Fn {
  return: [
    H.Call<H.Objects.Get<'name'>, this['arg0']>,
    InferIndex<this['arg0']>,
  ]
}

type IsAny<T> = 0 extends 1 & T ? true : false

type InferIndex<T> =
  IsAny<T> extends true
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    : T extends generics.Form
      ? FormIndex<
          H.Pipe<
            T,
            [
              H.Objects.Get<'fields'>,
              H.Tuples.Map<FieldToEntry>,
              H.Tuples.ToUnion,
              H.Objects.FromEntries,
            ]
          >
        >
      : T extends generics.Field
        ? H.Pipe<
            T,
            [
              H.Objects.Get<'type'>,
              H.Match<
                [
                  H.Match.With<'text', TextIndex>,
                  H.Match.With<'num', NumIndex>,
                  H.Match.With<'bool', BoolIndex>,
                  H.Match.With<'datetime', DatetimeIndex>,
                  H.Match.With<'decimal', DecimalIndex>,
                  H.Match.With<string, GenericIndex>, // fallback
                ]
              >,
            ]
          >
        : never

/** @internal */
export type IndexRoot<T extends generics.FormMLSchema> = InferIndex<T['form']>

/** @internal */
export default class IndexManager<T extends generics.FormMLSchema> {
  private readonly stores: Map<
    BaseIndex,
    Store<{ schema: H.Call<H.Objects.Values, FormMLAstType> }>
  > = new Map()

  public readonly root: IndexRoot<T>

  constructor(schema: T) {
    const root: FormIndex = {
      [IndexNameSymbol]: schema.form.name,
      [IndexTypeSymbol]: 'form',
    }

    const store = new Store()
    store.set('schema', schema.form)
    this.stores.set(root, store)

    for (const field of schema.form.fields) {
      const index = {
        [IndexNameSymbol]: field.name,
        [IndexTypeSymbol]: field.type,
      }
      root[field.name] = index

      const store = new Store()
      store.set('schema', field)
      this.stores.set(index, store)
    }

    this.root = root as IndexRoot<T>
  }

  for(index: BaseIndex) {
    const store = this.stores.get(index)
    if (!store) {
      throw new Error(
        `Given index is invalid, provided index:\n\n${JSON.stringify(index)}`,
      )
    }
    return store
  }
}

class Store<T extends Record<string, unknown>> {
  private readonly store: Partial<T> = {}

  get<K extends keyof T>(key: K): T[K] {
    if (!(key in this.store)) {
      throw new Error(`Key ${String(key)} does not exist in this store.`)
    }
    return this.store[key] as T[K]
  }

  set<K extends keyof T>(key: K, value: T[K]) {
    this.store[key] = value
  }
}
