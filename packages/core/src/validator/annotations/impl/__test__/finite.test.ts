import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

import { finite } from '../finite.js'

describe('finite', () => {
  test('should validate finite number', () => {
    // Arrange
    const action = { name: 'finite', options: {} } as const
    const validNumber = 123.45

    // Act
    const validatedSchema = finite(v.number(), action)
    const result = v.safeParse(validatedSchema, validNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject infinite number', () => {
    // Arrange
    const action = { name: 'finite', options: {} } as const
    const infiniteNumber = Infinity

    // Act
    const validatedSchema = finite(v.number(), action)
    const result = v.safeParse(validatedSchema, infiniteNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": Infinity,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid finite: Received Infinity",
          "path": undefined,
          "received": "Infinity",
          "requirement": [Function],
          "type": "finite",
        },
      ]
    `)
  })

  test('should validate finite BigNumber', () => {
    // Arrange
    const action = { name: 'finite', options: {} } as const
    const validBigNumber = new BigNumber('123.45')

    // Act
    const validatedSchema = finite(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, validBigNumber)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject infinite BigNumber', () => {
    // Arrange
    const action = { name: 'finite', options: {} } as const
    const infiniteBigNumber = new BigNumber('Infinity')

    // Act
    const validatedSchema = finite(v.instance(BigNumber), action)
    const result = v.safeParse(validatedSchema, infiniteBigNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "Infinity",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid finite: Received BigNumber",
          "path": undefined,
          "received": "BigNumber",
          "requirement": [Function],
          "type": "finite",
        },
      ]
    `)
  })

  test('should use custom error message', () => {
    // Arrange
    const customMessage = 'Value must be a finite number'
    const action = {
      name: 'finite',
      options: { message: customMessage },
    } as const
    const infiniteNumber = Infinity

    // Act
    const validatedSchema = finite(v.number(), action)
    const result = v.safeParse(validatedSchema, infiniteNumber)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": Infinity,
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Value must be a finite number",
          "path": undefined,
          "received": "Infinity",
          "requirement": [Function],
          "type": "finite",
        },
      ]
    `)
  })
})
