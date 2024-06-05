import { clearDocuments, parseHelper } from 'langium/test'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'
import { FormMLDeclaration } from '../../generated/ast.js'

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

  describe('annotation', () => {
    test('declare annotation', async () => {
      const input = `annot fun newAnnotation()`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare annotation with one parameter', async () => {
      const input = `annot fun newAnnotation(name)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('declare annotation with multiple parameters', async () => {
      const input = `annot fun newAnnotation(name, value)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('parameters allow trailing comma', async () => {
      const input = `annot fun newAnnotation(name,)`
      const ast = await parser(input)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('parameters disallow more than one trailing commas', async () => {
      const input = `annot fun newAnnotation(name,,)`
      await expect(parser(input)).rejects.toThrow()
    })
  })
})
