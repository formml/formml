import { BigNumber } from 'bignumber.js'
import { safeParse } from 'valibot'

import { schemas } from '../validation.js'

describe('plain validation schemas', () => {
  describe('bool schema', () => {
    test.each([true, false])('should accept boolean value %s', (input) => {
      expect(safeParse(schemas.bool, input).success).toBe(true)
    })

    test.each(['true', 1, null, undefined, {}])(
      'should reject non-boolean value %s',
      (input) => {
        expect(safeParse(schemas.bool, input).success).toBe(false)
      },
    )
  })

  describe('datetime schema', () => {
    test.each([
      '2024',
      '2024-01',
      '2024-01-01',
      '2024-01-01T00:00:00',
      '2024-01-01T00:00:00Z',
      '2024-01-01T00:00:00+05:00',
      new Date(),
    ])('should accept valid ISO datetime string or Date object %s', (input) => {
      expect(safeParse(schemas.datetime, input).success).toBe(true)
    })

    test.each(['invalid date', '10:30:00', 123, null, undefined])(
      'should reject invalid datetime format %s',
      (input) => {
        expect(safeParse(schemas.datetime, input).success).toBe(false)
      },
    )
  })

  describe('decimal schema', () => {
    test.each(['123.45', '-123.45', '0.0001', new BigNumber('123.45')])(
      'should accept decimal string or BigNumber %s',
      (input) => {
        expect(safeParse(schemas.decimal, input).success).toBe(true)
      },
    )

    test.each(['abc', '', '12.34.56', null, undefined, {}, []])(
      'should reject non-decimal value %s',
      (input) => {
        expect(safeParse(schemas.decimal, input).success).toBe(false)
      },
    )
  })

  describe('num schema', () => {
    test.each([123, -123, 0, 123.45, -123.45, Infinity, -Infinity])(
      'should accept number value %s',
      (input) => {
        expect(safeParse(schemas.num, input).success).toBe(true)
      },
    )

    test.each(['123', true, null, undefined, NaN])(
      'should reject non-number value %s',
      (input) => {
        expect(safeParse(schemas.num, input).success).toBe(false)
      },
    )
  })

  describe('text schema', () => {
    test.each(['hello', '', '123', 'true'])(
      'should accept string value %s',
      (input) => {
        expect(safeParse(schemas.text, input).success).toBe(true)
      },
    )

    test.each([123, true, null, undefined, {}, []])(
      'should reject non-string value %s',
      (input) => {
        expect(safeParse(schemas.text, input).success).toBe(false)
      },
    )
  })
})
