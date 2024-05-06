import { Field, Form } from '@formml/dsl'
import * as v from 'valibot'

import buildSchema from '../buildSchema.js'

describe('buildSchema', () => {
  describe('integration', () => {
    describe('type', () => {
      test('should validate string input if field type is text', () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'field',
          type: 'text',
        }

        // Act
        const schema = buildSchema(field)
        const result = v.safeParse(schema, 'abc')

        // Assert
        expect(result.success).toBe(true)
      })
    })
  })
})
