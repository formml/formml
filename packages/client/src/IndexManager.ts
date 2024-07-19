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
  public readonly root: FormIndex
  constructor(schema: FormMLSchema) {
    this.root = {
      [IndexNameSymbol]: schema.form.name,
      [IndexTypeSymbol]: 'form',
    }

    for (const field of schema.form.fields) {
      const index = {
        [IndexNameSymbol]: field.name,
        [IndexTypeSymbol]: field.type,
      }
      this.root[field.name] = index
    }
  }
}
