import * as v from 'valibot'

import { mac, mac48, mac64 } from '../mac.js'

describe('MAC address validations', () => {
  describe('mac', () => {
    test('should validate valid MAC address', () => {
      // Arrange
      const action = { name: 'mac', options: {} } as const
      const validMAC = '00:1B:44:11:3A:B7'

      // Act
      const validatedSchema = mac(v.string(), action)
      const result = v.safeParse(validatedSchema, validMAC)

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid MAC address', () => {
      // Arrange
      const action = { name: 'mac', options: {} } as const
      const invalidMAC = '00:1B:44:11:3A'

      // Act
      const validatedSchema = mac(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid MAC: Received "00:1B:44:11:3A"",
            "path": undefined,
            "received": ""00:1B:44:11:3A"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{2\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}:\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac",
          },
        ]
      `)
    })

    test('should use custom error message when provided', () => {
      // Arrange
      const action = {
        name: 'mac',
        options: { message: 'Custom MAC error message' },
      } as const
      const invalidMAC = '00:1B:44:11:3A'

      // Act
      const validatedSchema = mac(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom MAC error message",
            "path": undefined,
            "received": ""00:1B:44:11:3A"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{2\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}:\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac",
          },
        ]
      `)
    })
  })

  describe('mac48', () => {
    test('should validate valid MAC-48 address', () => {
      // Arrange
      const action = { name: 'mac48', options: {} } as const
      const validMAC48 = '00:1B:44:11:3A:B7'

      // Act
      const validatedSchema = mac48(v.string(), action)
      const result = v.safeParse(validatedSchema, validMAC48)

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid MAC-48 address', () => {
      // Arrange
      const action = { name: 'mac48', options: {} } as const
      const invalidMAC48 = '00:1B:44:11:3A'

      // Act
      const validatedSchema = mac48(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC48)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid 48-bit MAC: Received "00:1B:44:11:3A"",
            "path": undefined,
            "received": ""00:1B:44:11:3A"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{2\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac48",
          },
        ]
      `)
    })

    test('should use custom error message when provided', () => {
      // Arrange
      const action = {
        name: 'mac48',
        options: { message: 'Custom MAC-48 error message' },
      } as const
      const invalidMAC48 = '00:1B:44:11:3A'

      // Act
      const validatedSchema = mac48(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC48)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom MAC-48 error message",
            "path": undefined,
            "received": ""00:1B:44:11:3A"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{5\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{2\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac48",
          },
        ]
      `)
    })
  })

  describe('mac64', () => {
    test('should validate valid MAC-64 address', () => {
      // Arrange
      const action = { name: 'mac64', options: {} } as const
      const validMAC64 = '00:1B:44:11:3A:B7:22:33'

      // Act
      const validatedSchema = mac64(v.string(), action)
      const result = v.safeParse(validatedSchema, validMAC64)

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid MAC-64 address', () => {
      // Arrange
      const action = { name: 'mac64', options: {} } as const
      const invalidMAC64 = '00:1B:44:11:3A:B7'

      // Act
      const validatedSchema = mac64(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC64)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A:B7",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid 64-bit MAC: Received "00:1B:44:11:3A:B7"",
            "path": undefined,
            "received": ""00:1B:44:11:3A:B7"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}:\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac64",
          },
        ]
      `)
    })

    test('should use custom error message when provided', () => {
      // Arrange
      const action = {
        name: 'mac64',
        options: { message: 'Custom MAC-64 error message' },
      } as const
      const invalidMAC64 = '00:1B:44:11:3A:B7'

      // Act
      const validatedSchema = mac64(v.string(), action)
      const result = v.safeParse(validatedSchema, invalidMAC64)

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "00:1B:44:11:3A:B7",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom MAC-64 error message",
            "path": undefined,
            "received": ""00:1B:44:11:3A:B7"",
            "requirement": /\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{2\\}-\\)\\{7\\}\\[\\\\da-f\\]\\{2\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}\\\\\\.\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$\\|\\^\\(\\?:\\[\\\\da-f\\]\\{4\\}:\\)\\{3\\}\\[\\\\da-f\\]\\{4\\}\\$/iu,
            "type": "mac64",
          },
        ]
      `)
    })
  })
})
