import * as v from 'valibot'

import { imei } from '../imei.js'

describe('imei', () => {
  test('should validate valid IMEI number', () => {
    // Arrange
    const action = { name: 'imei', options: {} } as const
    const validImei = '490154203237518'

    // Act
    const validatedSchema = imei(v.string(), action)
    const result = v.safeParse(validatedSchema, validImei)

    // Assert
    expect(result.success).toBe(true)
  })

  test('should reject invalid IMEI format', () => {
    // Arrange
    const action = { name: 'imei', options: {} } as const
    const invalidImei = '123456789012345'

    // Act
    const validatedSchema = imei(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidImei)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "123456789012345",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Invalid IMEI: Received "123456789012345"",
          "path": undefined,
          "received": ""123456789012345"",
          "requirement": [Function],
          "type": "imei",
        },
      ]
    `)
  })

  test('should use custom error message when provided', () => {
    // Arrange
    const action = {
      name: 'imei',
      options: { message: 'Must be a valid IMEI number' },
    } as const
    const invalidImei = '123456789012345'

    // Act
    const validatedSchema = imei(v.string(), action)
    const result = v.safeParse(validatedSchema, invalidImei)

    // Assert
    expect(result.success).toBe(false)
    expect(result.issues).toMatchInlineSnapshot(`
      [
        {
          "abortEarly": undefined,
          "abortPipeEarly": undefined,
          "expected": null,
          "input": "123456789012345",
          "issues": undefined,
          "kind": "validation",
          "lang": undefined,
          "message": "Must be a valid IMEI number",
          "path": undefined,
          "received": ""123456789012345"",
          "requirement": [Function],
          "type": "imei",
        },
      ]
    `)
  })
})
