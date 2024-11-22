import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { integer } from '../integer.js'

describe('integer', () => {
  test('should validate integer number', () => {
    // Arrange
    const action = { name: 'integer', options: {} } as const
    const validNumber = 123

    // Act
    const validatedSchema = integer(v.number(), action)
    const result = v.safeParse(validatedSchema, validNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject decimal number', () => {
    // Arrange
    const action = { name: 'integer', options: {} } as const
    const decimalNumber = 123.45

    // Act
    const validatedSchema = integer(v.number(), action)
    const result = v.safeParse(validatedSchema, decimalNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": 123.45,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid integer: Received 123.45",
          "path": undefined,
          "received": "123.45",
          "requirement": [Function],
          "type": "integer",
        },
      ]
    `)
  })

  test('should validate integer BigNumber', () => {
    // Arrange
    const action = { name: 'integer', options: {} } as const
    const validBigNumber = new BigNumber('123')

    // Act
    const validatedSchema = integer(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, validBigNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject decimal BigNumber', () => {
    // Arrange
    const action = { name: 'integer', options: {} } as const
    const decimalBigNumber = new BigNumber('123.45')

    // Act
    const validatedSchema = integer(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, decimalBigNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "123.45",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid integer: Received BigNumber",
          "path": undefined,
          "received": "BigNumber",
          "requirement": [Function],
          "type": "integer",
        },
      ]
    `)
  })

  test('should use custom error message', () => {
    // Arrange
    const customMessage = 'Value must be a whole number'
    const action = {
      name: 'integer',
      options: { message: customMessage },
    } as const
    const decimalNumber = 123.45

    // Act
    const validatedSchema = integer(v.number(), action)
    const result = v.safeParse(validatedSchema, decimalNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": 123.45,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Value must be a whole number",
          "path": undefined,
          "received": "123.45",
          "requirement": [Function],
          "type": "integer",
        },
      ]
    `)
  })
})
