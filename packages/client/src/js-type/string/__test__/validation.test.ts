import * as c from '../valibot/validations/index.js'
import { schemas } from '../validation.js'

describe('validation schemas', () => {
  describe('text', () => {
    test('should equal to valibot string schema', () => {
      // Assert
      expect(schemas.text).toEqual(
        expect.objectContaining({
          async: false,
          kind: 'schema',
          type: 'string',
        }),
      )
    })
  })

  describe.each(['num', 'bool', 'datetime', 'decimal'] as const)(
    '%s',
    (type) => {
      test('should validate input with valibot string schema firstly', () => {
        // Assert
        expect(schemas[type]).toEqual(
          expect.objectContaining({
            async: false,
            kind: 'schema',
            type: 'string',
          }),
        )
        expect(schemas[type].pipe[0]).toEqual(
          expect.objectContaining({
            async: false,
            kind: 'schema',
            type: 'string',
          }),
        )
      })

      test('should validate input with custom validation secondly', () => {
        // Assert
        const validation = {
          bool: c.bool(),
          datetime: c.datetime(),
          decimal: c.decimal(),
          num: c.num(),
        }
        expect(schemas[type].pipe[1]).toEqual({
          ...validation[type],
          _run: expect.any(Function),
          requirement: expect.anything(),
        })
      })
    },
  )
})