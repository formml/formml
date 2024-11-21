import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { finite, integer, multipleOf } from '../numeric-validations.js'

describe('numeric-validations', () => {
  describe('finite', () => {
    describe('with number type', () => {
      test.each([
        123,
        0,
        -456,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      ])('should validate finite number %p', (input) => {
        // Arrange
        const schema = v.pipe(v.number(), finite(undefined))

        // Act
        const result = v.safeParse(schema, input)

        // Assert
        expect(result.success).toBe(true)
      })

      test.each([
        Infinity,
        -Infinity,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
      ])('should reject infinite number %p', (input) => {
        // Arrange
        const schema = v.pipe(v.number(), finite(undefined))

        // Act
        const result = v.safeParse(schema, input)

        // Assert
        expect(result.success).toBe(false)
        expect(result.issues).toMatchSnapshot()
      })
    })

    describe('with BigNumber type', () => {
      test.each([
        new BigNumber('123.456'),
        new BigNumber('0'),
        new BigNumber('-456.789'),
        new BigNumber('1e+308'),
        new BigNumber('-1e+308'),
      ])('should validate finite BigNumber %p', (value) => {
        // Arrange
        const schema = v.pipe(v.instance(BigNumber), finite(undefined))

        // Act
        const result = v.safeParse(schema, value)

        // Assert
        expect(result.success).toBe(true)
      })

      test.each([new BigNumber('Infinity'), new BigNumber('-Infinity')])(
        'should reject infinite BigNumber %p',
        (value) => {
          // Arrange
          const schema = v.pipe(v.instance(BigNumber), finite(undefined))

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )
    })
  })

  describe('integer', () => {
    describe('with number type', () => {
      test.each([
        123,
        0,
        -456,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
      ])('should validate integer number %p', (input) => {
        // Arrange
        const schema = v.pipe(v.number(), integer(undefined))

        // Act
        const result = v.safeParse(schema, input)

        // Assert
        expect(result.success).toBe(true)
      })

      test.each([123.45, -456.78, 0.1, Math.PI])(
        'should reject non-integer number %p',
        (input) => {
          // Arrange
          const schema = v.pipe(v.number(), integer(undefined))

          // Act
          const result = v.safeParse(schema, input)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )
    })

    describe('with BigNumber type', () => {
      test.each([
        new BigNumber('123'),
        new BigNumber('0'),
        new BigNumber('-456'),
        new BigNumber('1000000000000000'),
      ])('should validate integer BigNumber %p', (value) => {
        // Arrange
        const schema = v.pipe(v.instance(BigNumber), integer(undefined))

        // Act
        const result = v.safeParse(schema, value)

        // Assert
        expect(result.success).toBe(true)
      })

      test.each([
        new BigNumber('123.456'),
        new BigNumber('-456.789'),
        new BigNumber('0.1'),
        new BigNumber('3.14159'),
      ])('should reject non-integer BigNumber %p', (value) => {
        // Arrange
        const schema = v.pipe(v.instance(BigNumber), integer(undefined))

        // Act
        const result = v.safeParse(schema, value)

        // Assert
        expect(result.success).toBe(false)
        expect(result.issues).toMatchSnapshot()
      })
    })
  })

  describe('multipleOf', () => {
    describe('with number type', () => {
      test.each([
        { base: 5, value: 0 },
        { base: 5, value: 5 },
        { base: 5, value: 10 },
        { base: 5, value: -15 },
        { base: 3, value: 9 },
      ])(
        'should validate number multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(v.number(), multipleOf(base, undefined))

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(true)
        },
      )

      test.each([
        { base: 5, value: 2 },
        { base: 5, value: 7 },
        { base: 5, value: -13 },
        { base: 3, value: 10 },
      ])(
        'should reject number not multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(v.number(), multipleOf(base, undefined))

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )

      test.each([
        { base: 0.5, value: 1.0 },
        { base: 0.5, value: 1.5 },
        { base: 0.5, value: 2.0 },
      ])(
        'should validate decimal multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(v.number(), multipleOf(base, undefined))

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(true)
        },
      )

      test.each([
        { base: 0.1, value: 0.3 },
        { base: 0.1, value: 0.7 },
      ])(
        'should fail validation for decimal multiple due to precision issues: $base, $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(v.number(), multipleOf(base, undefined))

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )
    })

    describe('with BigNumber type', () => {
      test.each([
        { base: 5, value: new BigNumber('25') },
        { base: 5, value: new BigNumber('0') },
        { base: 5, value: new BigNumber('-30') },
        { base: 3, value: new BigNumber('999') },
      ])(
        'should validate BigNumber multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(
            v.instance(BigNumber),
            multipleOf(base, undefined),
          )

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(true)
        },
      )

      test.each([
        { base: 5, value: new BigNumber('23') },
        { base: 5, value: new BigNumber('-17') },
        { base: 3, value: new BigNumber('100') },
      ])(
        'should reject BigNumber not multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(
            v.instance(BigNumber),
            multipleOf(base, undefined),
          )

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(false)
          expect(result.issues).toMatchSnapshot()
        },
      )

      test.each([
        { base: 0.5, value: new BigNumber('2.5') },
        { base: 0.5, value: new BigNumber('3.0') },
        { base: 0.1, value: new BigNumber('0.3') },
        { base: 0.1, value: new BigNumber('0.7') },
      ])(
        'should validate BigNumber decimal multiple of $base: $value',
        ({ base, value }) => {
          // Arrange
          const schema = v.pipe(
            v.instance(BigNumber),
            multipleOf(base, undefined),
          )

          // Act
          const result = v.safeParse(schema, value)

          // Assert
          expect(result.success).toBe(true)
        },
      )
    })
  })
})
