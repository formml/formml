import { clearDocuments, parseHelper } from 'langium/test'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'
import { FormMLDeclaration, FormMLSchema } from '../../index.js'

describe('formml validator', () => {
  const services = createInMemoryAggregateServices()

  afterEach(async () => {
    await clearDocuments(services.shared)
  })

  const loadDeclaration = (input: string, uri: string) =>
    parseHelper<FormMLDeclaration>(services.FormMLDeclaration)(input, {
      documentUri: uri,
    })
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
  const parser = (input: string) =>
    parseHelper<FormMLSchema>(services.FormML)(input, { validation: true })

  describe('annotation', () => {
    beforeEach(async () => {
      const annotations = `
        annot fun required()
        annot fun range(min, max)
        annot fun any(name1, name2, name3, name4, name5, name6, name7, name8, name9, name10)
      `
      await loadDeclaration(annotations, 'file:///builtin-annotations.d.formml')
    })

    test('should no error when annotation is valid', async () => {
      const input = `
        form ExampleForm {
          @range(0, max: 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(0)
    })

    test('should error when called annotation is not defined', async () => {
      const input = `
        form ExampleForm {
          @unknown
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when annotation call is not immediately followed by @ sign', async () => {
      const input = `
        form ExampleForm {
          @     required
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when named arguments appear before positional arguments', async () => {
      const input = `
        form ExampleForm {
          @range(min: 0, 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when named arguments appear before positional arguments - multiple appearances', async () => {
      const input = `
        form ExampleForm {
          @any(1, name1: "value1", 2, name2: "value2", name3: "value3", 3, name4: "value4")
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(3)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should no error given insufficient arguments', async () => {
      const input = `
        form ExampleForm {
          @range(0)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(0)
    })
  })
})
