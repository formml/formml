import { Field, Form } from '@formml/dsl'

import buildInputSchema from '../buildInputSchema.js'
import buildSchema from '../buildSchema.js'
import * as i from '../inputTransform.js'

vi.mock('../inputTransform.js')
vi.mock('../buildSchema.js')

describe('buildInputSchema', () => {
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
      const transformer = {
        bool: i.toBool,
        datetime: i.toDatetime,
        decimal: i.toDecimal,
        num: i.toNum,
      }

      test('should validate and transform input firstly with custom transformer', () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'field',
          type,
        }
        const dummySchema = {} as never
        vi.mocked(transformer[type]).mockReturnValue(dummySchema)

        // Act
        const schema = buildInputSchema(field)

        // Assert
        expect(schema).toBe(dummySchema)
      })
    },
  )
})
