import { clearDocuments, parseHelper } from 'langium/test'

import type { FormMLDeclaration, FormMLSchema } from '../../index.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'

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
        fun required()
        fun range(min, max)
        fun range2(min, max?: any)
        fun anything(name1, name2, name3, name4, name5, name6, name7)
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
          @anything(1, name2: "value2", 3, name4: "value4", name5: "value5", 6, name7: "value7")
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(3)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error given too many arguments', async () => {
      const input = `
        form ExampleForm {
          @range(0, 100, 200)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error given too many arguments - with optional parameters', async () => {
      const declaration = 'fun test(param1, param2?: any)'
      await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
      const input = `
        form ExampleForm {
          @test(0, 100, 200)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error given unknown named argument', async () => {
      const input = `
        form ExampleForm {
          @range2(0, unknown: 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when re-assigning to same parameter', async () => {
      const input = `
        form ExampleForm {
          @range2(min: 10, min: 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when re-assigning to same parameter - mix of named and positional arguments', async () => {
      const input = `
        form ExampleForm {
          @range2(10, min: 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })

    describe.each([
      {
        argType: 'positional argument',
        builder: (arg: Record<string, string>) => Object.values(arg).shift(),
      },
      {
        argType: 'named argument',
        builder: (arg: Record<string, string>) =>
          Object.entries(arg)
            .map(([k, v]) => `${k}: ${v}`)
            .shift(),
      },
    ])('parameters assignment type check - $argType', ({ builder: arg }) => {
      test.each([
        '"double quoted string"',
        "'single quoted string'",
        '123',
        'true',
        'false',
        'null',
      ])(
        'can assign any value to a parameter without type hint',
        async (value) => {
          // Arrange
          const declaration = 'fun test(name)'
          await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
          const input = `
            form ExampleForm {
              @test(${arg({ name: value })})
              num numberField
            }
          `

          // Act
          const { diagnostics } = await parser(input)

          // Assert
          expect(diagnostics).toHaveLength(0)
        },
      )

      test.each([
        '"double quoted string"',
        "'single quoted string'",
        '123',
        'true',
        'false',
        'null',
      ])('can assign any value to a parameter with any type', async (value) => {
        // Arrange
        const declaration = 'fun test(name: any)'
        await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
        const input = `
          form ExampleForm {
            @test(${arg({ name: value })})
            num numberField
          }
        `

        // Act
        const { diagnostics } = await parser(input)

        // Assert
        expect(diagnostics).toHaveLength(0)
      })

      test.each([
        ['text', '"double quoted string"'],
        ['text', "'single quoted string'"],
        ['num', '123'],
        ['bool', 'true'],
        ['bool', 'false'],
        // Not implemented yet
        // ['decimal', 'Decimal(123.45)'],
        // ['datetime', 'Datetime("2024-01-01T00:00:00Z")'],
      ])(
        'can assign correct typed value to a parameter with corresponding type hint - %s',
        async (type, value) => {
          // Arrange
          const declaration = `fun test(name: ${type})`
          await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
          const input = `
            form ExampleForm {
              @test(${arg({ name: value })})
              num numberField
            }
          `

          // Act
          const { diagnostics } = await parser(input)

          // Assert
          expect(diagnostics).toHaveLength(0)
        },
      )

      test.each([
        ['text', '123'],
        ['num', '"double quoted string"'],
        ['bool', '"double quoted string"'],
        ['decimal', '123.45'],
        ['datetime', '"2024-01-01T00:00:00Z"'],
      ])(
        'cannot assign incorrect typed value to a parameter with type hint - %s',
        async (type, value) => {
          // Arrange
          const declaration = `fun test(name: ${type})`
          await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
          const input = `
            form ExampleForm {
              @test(${arg({ name: value })})
              num numberField
            }
          `

          // Act
          const { diagnostics } = await parser(input)

          // Assert
          expect(diagnostics).toHaveLength(1)
          expect(diagnostics).toMatchSnapshot()
        },
      )

      test('can omit optional parameter', async () => {
        // Arrange
        const declaration = 'fun test(name: text, optional?: text)'
        await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
        const input = `
          form ExampleForm {
            @test(${arg({ name: '"value"' })})
            num numberField
          }
        `

        // Act
        const { diagnostics } = await parser(input)

        // Assert
        expect(diagnostics).toHaveLength(0)
      })

      test('cannot omit required parameter', async () => {
        // Arrange
        const declaration = 'fun test(name: text, required: text)'
        await loadDeclaration(declaration, 'file:///test-annotation.d.formml')
        const input = `
          form ExampleForm {
            @test(${arg({ name: '"value"' })})
            num numberField
          }
        `

        // Act
        const { diagnostics } = await parser(input)

        // Assert
        expect(diagnostics).toHaveLength(1)
        expect(diagnostics).toMatchSnapshot()
      })
    })

    describe.todo('annotation assignment type check')
  })
})
