import * as vp from '@formml/utils/valibot-plus'

import { schemas } from '../validation.js'

describe('validation schemas', () => {
  describe.each(['text', 'bool'] as const)('%s', (type) => {
    test('should equal to valibot string schema', () => {
      // Assert
      expect(schemas[type]).toEqual(
        expect.objectContaining({
          async: false,
          kind: 'schema',
          type: 'string',
        }),
      )
    })
  })

  describe.each(['num', 'datetime', 'decimal'] as const)('%s', (type) => {
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
        datetime: vp.isoDateTime(),
        decimal: vp.numerical(),
        num: vp.numerical(),
      }
      expect(schemas[type].pipe[1]).toMatchObject({
        kind: 'validation',
        type: 'allow_blank',
        wrapped: expect.objectContaining({
          ...validation[type],
          _run: expect.any(Function),
          requirement: expect.anything(),
        }),
      })
    })
  })
})
