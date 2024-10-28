import type { Field, Form, FormMLSchema } from '@formml/dsl'
import type { GenericSchema, SchemaWithPipe } from 'valibot'

import { buildSchema } from '@formml/core'
import { transform } from 'valibot'

import { fromString } from '../../js-type/string/conversion.js'
import buildInputSchema from '../buildInputSchema.js'
import * as v from '../valibot/validations/index.js'

vi.mock('@formml/core')
vi.mock('../../js-type/string/conversion.js')

describe('buildInputSchema', () => {
  describe('field', () => {
    describe('text', () => {
      test('should return built valibot schema directly', () => {
        // Arrange
        const textField: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'textField',
          type: 'text',
        }
        const dummySchema = {} as never
        vi.mocked(buildSchema).mockReturnValue(dummySchema)

        // Act
        const schema = buildInputSchema(textField)

        // Assert
        expect(buildSchema).toBeCalledWith(textField)
        expect(schema).toBe(dummySchema)
      })
    })

    describe.each(['num', 'bool', 'datetime', 'decimal'] as const)(
      '%s',
      (type) => {
        test('should validate input with string schema', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }

          // Act
          const schema = buildInputSchema(field) as SchemaWithPipe<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [GenericSchema, ...any[]]
          >

          // Assert
          expect(schema).toEqual(
            expect.objectContaining({
              async: false,
              kind: 'schema',
              type: 'string',
            }),
          )
          expect(schema.pipe[0]).toEqual(
            expect.objectContaining({
              async: false,
              kind: 'schema',
              type: 'string',
            }),
          )
        })

        test('should validate input with custom validation', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }

          // Act
          const schema = buildInputSchema(field) as SchemaWithPipe<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [GenericSchema, ...any[]]
          >

          // Assert
          const validation = {
            bool: v.bool(),
            datetime: v.datetime(),
            decimal: v.decimal(),
            num: v.num(),
          }
          expect(schema.pipe[1]).toEqual({
            ...validation[type],
            _run: expect.any(Function),
            requirement: expect.anything(),
          })
        })

        test('should transform the input with corresponding parser', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dummyParser = (() => undefined) as any
          vi.mocked(fromString).mockReturnValue(dummyParser)

          // Act
          const schema = buildInputSchema(field) as SchemaWithPipe<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [GenericSchema, ...any[]]
          >

          // Assert
          expect(fromString).toBeCalledWith(type)
          expect(schema.pipe[2]).toEqual({
            ...transform(dummyParser),
            _run: expect.any(Function),
          })
        })

        test('should pipe inner typed schema to last', () => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'field',
            type,
          }

          const innerSchema = {} as never
          vi.mocked(buildSchema).mockReturnValue(innerSchema)

          // Act
          const schema = buildInputSchema(field) as SchemaWithPipe<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [GenericSchema, ...any[]]
          >

          // Assert
          expect(schema.pipe[3]).toBe(innerSchema)
        })
      },
    )
  })

  describe('form', () => {
    test('should wrap all fields with object schema', () => {
      // Arrange
      const form: Form = {
        $container: {} as FormMLSchema,
        $type: 'Form',
        fields: [
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'textField',
            type: 'text',
          },
          {
            $container: {} as Form,
            $type: 'Field',
            annotations: [],
            name: 'numField',
            type: 'num',
          },
        ],
        name: 'ExampleForm',
      }
      const innerSchema = {} as never
      vi.mocked(buildSchema).mockReturnValue(innerSchema)

      // Act
      const schema = buildInputSchema(form)

      // Assert
      expect(schema).toEqual(
        expect.objectContaining({
          async: false,
          entries: {
            numField: expect.any(Object),
            textField: expect.any(Object),
          },
          kind: 'schema',
          type: 'strict_object',
        }),
      )
    })
  })
})
