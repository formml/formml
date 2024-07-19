import { FormMLSchema } from '@formml/dsl'

const IndexNameSymbol = Symbol('name')
const IndexTypeSymbol = Symbol('type')

export const IndexSymbol = {
  name: IndexNameSymbol,
  type: IndexTypeSymbol,
}

export type AnyIndex = {
  [IndexNameSymbol]: string
  [IndexTypeSymbol]: string
}

export type FormIndex<
  TChildren extends Record<string, AnyIndex> = Record<string, AnyIndex>,
> = {
  [IndexNameSymbol]: string
  [IndexTypeSymbol]: 'form'
} & TChildren

export default class IndexManager {
  private readonly stores: Map<AnyIndex, Store> = new Map()

  public readonly root: FormIndex

  constructor(schema: FormMLSchema) {
    const index: FormIndex = {
      [IndexNameSymbol]: schema.form.name,
      [IndexTypeSymbol]: 'form',
    }
    this.root = index

    const store = new Store()
    store.set('schema', schema.form)
    this.stores.set(index, store)

    for (const field of schema.form.fields) {
      const index = {
        [IndexNameSymbol]: field.name,
        [IndexTypeSymbol]: field.type,
      }
      this.root[field.name] = index

      const store = new Store()
      store.set('schema', field)
      this.stores.set(index, store)
    }
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
