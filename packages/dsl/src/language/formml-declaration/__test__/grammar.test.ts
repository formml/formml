import { clearDocuments, parseHelper } from 'langium/test'

import type { FormMLDeclaration } from '../../generated/ast.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'

describe('formml declaration grammar', () => {
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

  describe('function', () => {
    test('declare function', async () => {
      const input = `fun myFunction()`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare function with one parameter', async () => {
      const input = `fun myFunction(name)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare function with multiple parameters', async () => {
      const input = `fun myFunction(name, value)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('parameters allow trailing comma', async () => {
      const input = `fun myFunction(name,)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('parameters disallow more than one trailing commas', async () => {
      const input = `fun myFunction(name,,)`
      await expect(parser(input)).rejects.toThrow()
    })

    describe('type hints', () => {
      test('can omit type hint', async () => {
        const input = `fun myFunction(param1, param2)`
        const ast = await parser(input)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('parameters can be any', async () => {
        const input = `fun myFunction(param1: any, param2: any)`
        const ast = await parser(input)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test.each(['text', 'num', 'bool', 'datetime', 'decimal'])(
        'parameters can be primitive type "%s"',
        async (type) => {
          const input = `fun myFunction(param1: ${type}, param2: ${type})`
          const ast = await parser(input)
          expect(serialize(ast)).toMatchSnapshot()
        },
      )

      test('parameters can be optional', async () => {
        const input = `fun myFunction(param1: num, param2?: any)`
        const ast = await parser(input)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('return type can be any', async () => {
        const input = `fun myFunction(): any`
        const ast = await parser(input)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test.each(['text', 'num', 'bool', 'datetime', 'decimal'])(
        'return type can be primitive type "%s"',
        async (type) => {
          const input = `fun myFunction(): ${type}`
          const ast = await parser(input)
          expect(serialize(ast)).toMatchSnapshot()
        },
      )
    })
  })
})
