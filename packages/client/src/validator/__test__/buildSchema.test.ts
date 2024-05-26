import { Field, Form } from '@formml/dsl'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import * as v from 'valibot'

import buildSchema from '../buildSchema.js'

describe('buildSchema', () => {
  describe('integration', () => {
    describe.each(['text', 'num', 'bool', 'datetime', 'decimal'] as const)(
      'types - %s',
      (type) => {
        const fixtures = {
          bool: {
            expectedType: 'boolean',
            invalidInput: 'abc',
            validInput: true,
          },
          datetime: {
            expectedType: 'Date',
            invalidInput: dayjs('2024-01-01T00:00:00Z'),
            validInput: new Date('2024-01-01T00:00:00Z'),
          },
          decimal: {
            expectedType: 'BigNumber',
            invalidInput: 123.45,
            validInput: new BigNumber('123.45'),
          },
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
      },
    )

    test.each(['text', 'num', 'bool', 'datetime', 'decimal'] as const)(
      'should be optional by default',
      (type) => {
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
        const result = v.safeParse(schema, undefined)

        // Assert
        expect(result.success).toBe(true)
      },
    )

    describe('required', () => {
      test.each(['text', 'num', 'bool', 'datetime', 'decimal'] as const)(
        'should invalidate undefined if field is required',
        (type) => {
          // Arrange
          const field: Field = {
            $container: {} as Form,
            $type: 'Field',
            annotations: [
              {
                $container: {} as Field,
                $type: 'Annotation',
                name: 'required',
              },
            ],
            name: 'field',
            type,
          }

          // Act
          const schema = buildSchema(field)
          const result = v.safeParse(schema, undefined)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )

      test('should invalidate empty string if a text field is required', () => {
        // Arrange
        const field: Field = {
          $container: {} as Form,
          $type: 'Field',
          annotations: [
            {
              $container: {} as Field,
              $type: 'Annotation',
              name: 'required',
            },
          ],
          name: 'field',
          type: 'text',
        }

        // Act
        const schema = buildSchema(field)
        const result = v.safeParse(schema, '')

        // Assert
        expect(result.success).toBe(false)
        expect(result.issues).toMatchSnapshot()
      })
    })
  })
})
