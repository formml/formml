import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { multipleOf } from '../multipleOf.js'

describe('multipleOf', () => {
  test('should validate number multiple of requirement', () => {
    // Arrange
    const action = { name: 'multipleOf', options: { divisor: 5 } } as const
    const validNumber = 15

    // Act
    const validatedSchema = multipleOf(v.number(), action)
    const result = v.safeParse(validatedSchema, validNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject number not multiple of requirement', () => {
    // Arrange
    const action = { name: 'multipleOf', options: { divisor: 5 } } as const
    const invalidNumber = 17

    // Act
    const validatedSchema = multipleOf(v.number(), action)
    const result = v.safeParse(validatedSchema, invalidNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "%5",
          "input": 17,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid multiple: Expected %5 but received 17",
          "path": undefined,
          "received": "17",
          "requirement": [Function],
          "type": "multiple_of",
        },
      ]
    `)
  })

  test('should validate BigNumber multiple of requirement', () => {
    // Arrange
    const action = { name: 'multipleOf', options: { divisor: 5 } } as const
    const validBigNumber = new BigNumber('15')

    // Act
    const validatedSchema = multipleOf(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, validBigNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject BigNumber not multiple of requirement', () => {
    // Arrange
    const action = { name: 'multipleOf', options: { divisor: 5 } } as const
    const invalidBigNumber = new BigNumber('17')

    // Act
    const validatedSchema = multipleOf(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, invalidBigNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "%5",
          "input": "17",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid multiple: Expected %5 but received BigNumber",
          "path": undefined,
          "received": "BigNumber",
          "requirement": [Function],
          "type": "multiple_of",
        },
      ]
    `)
  })

  test('should use custom error message', () => {
    // Arrange
    const customMessage = 'Value must be divisible by 5'
    const action = {
      name: 'multipleOf',
      options: { divisor: 5, message: customMessage },
    } as const
    const invalidNumber = 17

    // Act
    const validatedSchema = multipleOf(v.number(), action)
    const result = v.safeParse(validatedSchema, invalidNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": "%5",
          "input": 17,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Value must be divisible by 5",
          "path": undefined,
          "received": "17",
          "requirement": [Function],
          "type": "multiple_of",
        },
      ]
    `)
  })
})
