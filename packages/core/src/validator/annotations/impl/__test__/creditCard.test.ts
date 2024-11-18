import * as v from 'valibot'

import { creditCard } from '../creditCard.js'

describe('creditCard', () => {
  test('should validate valid credit card number', () => {
    // Arrange
    const action = { name: 'creditCard', options: {} } as const
    const validCard = '4532015112830366' // Valid Visa number

    // Act
    const validatedSchema = creditCard(v.string(), action)
    const result = v.safeParse(validatedSchema, validCard)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid credit card number', () => {
    // Arrange
    const action = { name: 'creditCard', options: {} } as const
    const invalidCard = '1234567890123456'

    // Act
    const validatedSchema = creditCard(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidCard)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "1234567890123456",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid credit card: Received "1234567890123456"",
          "path": undefined,
          "received": ""1234567890123456"",
          "requirement": [Function],
          "type": "credit_card",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'creditCard',
      options: { message: 'Invalid card number' },
    } as const
    const invalidCard = '1234567890123456'

    // Act
    const validatedSchema = creditCard(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidCard)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "1234567890123456",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid card number",
          "path": undefined,
          "received": ""1234567890123456"",
          "requirement": [Function],
          "type": "credit_card",
        },
      ]
    `)
  })
})
