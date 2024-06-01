import { parseHelper } from 'langium/test'

import { createInMemoryServices } from '../formml-module.js'
import { FormMLSchema } from '../generated/ast.js'

describe('grammar', () => {
  const services = createInMemoryServices()
  const serialize = (ast: FormMLSchema) =>
    services.FormML.serializer.JsonSerializer.serialize(ast, { space: 2 })
  const parser = (input: string) =>
    parseHelper<FormMLSchema>(services.FormML)(input)
      .then((x) => x.parseResult)
      .then((r) =>
        r.lexerErrors.length > 0 || r.parserErrors.length > 0
          ? Promise.reject(new Error('Parsing failed'))
          : r.value,
      )

  describe('syntax', () => {
    test('comments', async () => {
      const content = `
        // inline comment

        form Example {
          /* multiple line comment
          num commentedField
          */

          num numberField
        }
      `

      const ast = await parser(content)
      expect(serialize(ast)).toMatchSnapshot()
    })
  })

  describe('simple fields', () => {
    test('primitives', async () => {
      const content = `
        form ExampleForm {
          num      numberField
          decimal  decimalField
          text     textField
          bool	   boolField
          datetime datetimeField
        }
      `
      const ast = await parser(content)
      expect(serialize(ast)).toMatchSnapshot()
    })

    test('invalidate unknown types', async () => {
      const content = `
        form ExampleForm {
          unknown invalidType
        }
      `
      await expect(() => parser(content)).rejects.toThrow()
    })
  })

  describe('validation annotations', () => {
    describe('non-argument annotation', () => {
      test('one line', async () => {
        const content = `
          form ExampleForm {
            @required num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('multiple lines', async () => {
        const content = `
          form ExampleForm {
            @required
            num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('multiple annotations', async () => {
        const content = `
          form ExampleForm {
            @required1
            @required2
            num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('annotation with parentheses', async () => {
        const content = `
          form ExampleForm {
            @required()
            num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })
    })

    describe('annotation with arguments', () => {
      test('one argument', async () => {
        const content = `
          form ExampleForm {
            @min(10)
            num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })

      describe('argument type', () => {
        describe('JS-like literals', () => {
          test.each([`'single quotes'`, `"double quotes"`])(
            'string - %j',
            async (input) => {
              const content = `
                form ExampleForm {
                  @any(${input})
                  num numberField
                }
              `
              const ast = await parser(content)
              expect(serialize(ast)).toMatchSnapshot()
            },
          )

          test.each(['0', '123', '-123', '123.456', '-123.456'])(
            'number - %j',
            async (input) => {
              const content = `
                form ExampleForm {
                  @any(${input})
                  num numberField
                }
              `
              const ast = await parser(content)
              expect(serialize(ast)).toMatchSnapshot()
            },
          )
        })
      })
    })
  })
})
