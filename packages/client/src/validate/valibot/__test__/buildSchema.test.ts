import { Field, Form } from '@formml/dsl'
import * as v from 'valibot'

import buildSchema from '../buildSchema.js'

describe('buildSchema', () => {
  describe('integration', () => {
    describe.each(['text', 'num'] as const)('types - %s', (type) => {
      const fixtures = {
        num: {
          expectedType: 'number',
          invalidInput: 'abc',
          validInput: 123,
        },
        text: {
          expectedType: 'string',
          invalidInput: 123,
          validInput: 'abc',
        },
      }

      test(`should validate ${fixtures[type].expectedType} input if field type is ${type}`, () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'field',
          type,
        }

        // Act
        const schema = buildSchema(field)
        const result = v.safeParse(schema, fixtures[type].validInput)

        // Assert
        expect(result.success).toBe(true)
      })

      test(`should invalidate non-${fixtures[type].expectedType} input if field type is ${type}`, () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'field',
          type,
        }

        // Act
        const schema = buildSchema(field)
        const result = v.safeParse(schema, fixtures[type].invalidInput)

        // Assert
        expect(result.success).toBe(false)
        expect(result.issues).toMatchSnapshot()
      })
    })
  })
})
