import { clearDocuments, parseHelper } from 'langium/test'

import type { FormMLDeclaration, FormMLSchema } from '../../generated/ast.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'

describe('formml grammar', () => {
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
  const serialize = (ast: FormMLSchema) =>
    services.FormML.serializer.JsonSerializer.serialize(ast, { space: 2 })
  const parser = (input: string) =>
    parseHelper<FormMLSchema>(services.FormML)(input)
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
      await expect(parser(content)).rejects.toThrow()
    })
  })

  describe('validation annotations', () => {
    beforeEach(async () => {
      const annotations = `
        fun required()
        fun required1()
        fun required2()
        fun min(value)
        fun range(min, max)
        fun anything(value)
      `
      await loadDeclaration(annotations, 'file:///builtin-annotations.d.formml')
    })

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
      describe('positional arguments', () => {
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

        test('multiple arguments', async () => {
          const content = `
            form ExampleForm {
              @range(10, 20)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('allows trailing comma', async () => {
          const content = `
            form ExampleForm {
              @range(10, 20,)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('disallows more than one trailing comma', async () => {
          const content = `
            form ExampleForm {
              @range(10, 20, ,)
              num numberField
            }
          `
          await expect(parser(content)).rejects.toThrow()
        })
      })

      describe('named arguments', () => {
        test('one argument', async () => {
          const content = `
            form ExampleForm {
              @min(value: 10)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('multiple arguments', async () => {
          const content = `
            form ExampleForm {
              @range(min: 10, max: 20)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('multiple arguments with any order', async () => {
          const content = `
            form ExampleForm {
              @range(max: 20, min: 10)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('allows trailing comma', async () => {
          const content = `
            form ExampleForm {
              @range(min: 10, max: 20,)
              num numberField
            }
          `
          const ast = await parser(content)
          expect(serialize(ast)).toMatchSnapshot()
        })

        test('disallows more than one trailing comma', async () => {
          const content = `
            form ExampleForm {
              @range(min: 10, max: 20, ,)
              num numberField
            }
          `
          await expect(parser(content)).rejects.toThrow()
        })
      })

      test('mixes positional and named arguments', async () => {
        const content = `
          form ExampleForm {
            @range(10, max: 20)
            num numberField
          }
        `
        const ast = await parser(content)
        expect(serialize(ast)).toMatchSnapshot()
      })

      test('does not check named argument positions in parsing', async () => {
        const content = `
          form ExampleForm {
            @range(min: 10, 20)
            num numberField
          }
        `
        await expect(parser(content)).resolves.not.toThrow()
      })

      describe('argument type', () => {
        describe('JS-like literals', () => {
          test.each([
            `'single quotes'`,
            `"double quotes"`,
            String.raw`'escape \' \" \\ \n \t'`,
            String.raw`"escape \' \" \\ \n \t"`,
          ])('string - %s', async (input) => {
            const content = `
                form ExampleForm {
                  @anything(${input})
                  num numberField
                }
              `
            const ast = await parser(content)
            expect(serialize(ast)).toMatchSnapshot()
          })

          test.each(['0', '123', '-123', '123.456', '-123.456'])(
            'number - %j',
            async (input) => {
              const content = `
                form ExampleForm {
                  @anything(${input})
                  num numberField
                }
              `
              const ast = await parser(content)
              expect(serialize(ast)).toMatchSnapshot()
            },
          )

          test.each(['0123', '-0123', '0123.456', '-0123.456', '0000123'])(
            'numbers should prevent leading zeros - %j',
            async (input) => {
              const content = `
                form ExampleForm {
                  @anything(${input})
                  num numberField
                }
              `
              await expect(parser(content)).rejects.toThrow()
            },
          )

          test.each(['true', 'false'])('boolean - %j', async (input) => {
            const content = `
              form ExampleForm {
                @anything(${input})
                num numberField
              }
            `
            const ast = await parser(content)
            expect(serialize(ast)).toMatchSnapshot()
          })

          test('null', async () => {
            const content = `
              form ExampleForm {
                @anything(null)
                num numberField
              }
            `
            const ast = await parser(content)
            expect(serialize(ast)).toMatchSnapshot()
          })
        })
      })
    })
  })
})
