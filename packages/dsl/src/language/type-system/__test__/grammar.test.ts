import { clearDocuments, parseHelper } from 'langium/test'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'
import { FormMLDeclaration } from '../../generated/ast.js'

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
        annot fun myAnnotation(param: MyType): MyType
      `
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })
  })
})
