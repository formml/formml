import { generics } from '@formml/dsl'
import * as H from 'hotscript'

// private symbols
const IndexNameSymbol = Symbol('name')
const IndexTypeSymbol = Symbol('type')

export const IndexSymbol = {
  name: IndexNameSymbol,
  type: IndexTypeSymbol,
} as const

export interface BaseIndex {
  [IndexNameSymbol]: string
  [IndexTypeSymbol]: string
}

export interface AnyIndex extends BaseIndex {
  [child: string]: AnyIndex
}

interface BaseFormIndex extends BaseIndex {
  [IndexTypeSymbol]: 'form'
}

export type FormIndex<
  TChildren extends Record<string, AnyIndex> = Record<string, AnyIndex>,
> = BaseFormIndex & TChildren

export interface TextIndex extends BaseIndex {
  [IndexTypeSymbol]: 'text'
}

export interface NumIndex extends BaseIndex {
  [IndexTypeSymbol]: 'num'
}

export interface BoolIndex extends BaseIndex {
  [IndexTypeSymbol]: 'bool'
}

export interface DatetimeIndex extends BaseIndex {
  [IndexTypeSymbol]: 'datetime'
}

export interface DecimalIndex extends BaseIndex {
  [IndexTypeSymbol]: 'decimal'
}

interface FieldToEntry extends H.Fn {
  return: [
    H.Call<H.Objects.Get<'name'>, this['arg0']>,
    InferIndex<this['arg0']>,
  ]
}

type InferIndex<T> = T extends generics.Form
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
              H.Match.With<string, AnyIndex>, // fallback
            ]
          >,
        ]
      >
    : never

export type IndexRoot<T extends generics.FormMLSchema> = InferIndex<T['form']>

export default class IndexManager<T extends generics.FormMLSchema> {
  private readonly stores: Map<AnyIndex, Store> = new Map()

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

  for(index: AnyIndex) {
    const store = this.stores.get(index)
    if (!store) {
      throw new Error(
        `Given index is invalid, provided index:\n\n${JSON.stringify(index)}`,
      )
    }
    return store
  }
}

class Store {
  private readonly store: Record<string, unknown> = {}

  get(key: string): unknown {
    if (!(key in this.store)) {
      throw new Error(`Key ${key} does not exist in this store.`)
    }
    return this.store[key]
  }

  set(key: string, value: unknown) {
    this.store[key] = value
  }
}
