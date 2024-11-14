import { clearDocuments, parseHelper } from 'langium/test'

import type { FormMLDeclaration } from '../../generated/ast.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'

describe('type system grammar', () => {
  const services = createInMemoryAggregateServices()

  afterEach(async () => {
    await clearDocuments(services.FormMLDeclaration)
  })

  const serialize = (ast: FormMLDeclaration) =>
    services.FormMLDeclaration.serializer.JsonSerializer.serialize(ast, {
      space: 2,
    })
  const parser = (input: string) =>
    parseHelper<FormMLDeclaration>(services.FormMLDeclaration)(input)
      .then((x) => x.parseResult)
      .then((r) =>
        r.lexerErrors.length > 0 || r.parserErrors.length > 0
          ? Promise.reject(
              new Error(
                'Parsing failed with errors:\n' +
                  [...r.lexerErrors, ...r.parserErrors]
                    .map((e) => e.message)
                    .join('\n'),
              ),
            )
          : r.value,
      )

  describe('type alias', () => {
    test('declare simple type alias', async () => {
      const input = `type MyType = text`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('type alias can be used as a type', async () => {
      const input = `
        type MyType = text
        fun myFunction(param: MyType): MyType
      `
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare object type alias', async () => {
      const input = `type MyType = { name: text; age: num }`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare type alias with type parameters', async () => {
      const input = `type MyType<T, U> = { name: T; age: U }`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('call type alias with type parameters', async () => {
      const input = `
        type MyType<T, U> = { name: T; age: U }
        fun myFunction(param: MyType<text, num>): MyType<bool, decimal>
      `
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })
  })
})
