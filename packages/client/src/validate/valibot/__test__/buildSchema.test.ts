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

      test('should invalidate non-string input if field type is text', () => {
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
        const result = v.safeParse(schema, 123)

        // Assert
        expect(result.success).toBe(false)
        expect(result.issues).toMatchInlineSnapshot(`
          [
            {
              "abortEarly": undefined,
              "abortPipeEarly": undefined,
              "context": "string",
              "expected": "string",
              "input": 123,
              "issues": undefined,
              "lang": undefined,
              "message": "Invalid type: Expected string but received 123",
              "path": undefined,
              "reason": "type",
              "received": "123",
              "skipPipe": undefined,
            },
          ]
        `)
      })
    })
  })
})
