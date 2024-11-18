import * as v from 'valibot'

import { ip, ipv4, ipv6 } from '../ip.js'

describe('ip validators', () => {
  describe('ip', () => {
    test('should validate valid IPv4 address', () => {
      // Arrange
      const action = { name: 'ip', options: {} } as const

      // Act
      const validatedSchema = ip(v.string(), action)
      const result = v.safeParse(validatedSchema, '192.168.1.1')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should validate valid IPv6 address', () => {
      // Arrange
      const action = { name: 'ip', options: {} } as const

      // Act
      const validatedSchema = ip(v.string(), action)
      const result = v.safeParse(
        validatedSchema,
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      )

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid IP address', () => {
      // Arrange
      const action = { name: 'ip', options: {} } as const

      // Act
      const validatedSchema = ip(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid IP: Received "not an ip"",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\(\\?:\\\\\\.\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\)\\{3\\}\\$\\|\\^\\(\\?:\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,7\\}:\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,6\\}:\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,5\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,2\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,3\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,3\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,2\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,5\\}\\|\\[\\\\da-f\\]\\{1,4\\}:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,6\\}\\|:\\(\\?:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,7\\}\\|:\\)\\|fe80:\\(\\?::\\[\\\\da-f\\]\\{0,4\\}\\)\\{0,4\\}%\\[\\\\da-z\\]\\+\\|::\\(\\?:f\\{4\\}\\(\\?::0\\{1,4\\}\\)\\?:\\)\\?\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}:\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\)\\$/iu,
            "type": "ip",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'ip',
        options: { message: 'Custom IP error' },
      } as const

      // Act
      const validatedSchema = ip(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom IP error",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\(\\?:\\\\\\.\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\)\\{3\\}\\$\\|\\^\\(\\?:\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,7\\}:\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,6\\}:\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,5\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,2\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,3\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,3\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,2\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,5\\}\\|\\[\\\\da-f\\]\\{1,4\\}:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,6\\}\\|:\\(\\?:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,7\\}\\|:\\)\\|fe80:\\(\\?::\\[\\\\da-f\\]\\{0,4\\}\\)\\{0,4\\}%\\[\\\\da-z\\]\\+\\|::\\(\\?:f\\{4\\}\\(\\?::0\\{1,4\\}\\)\\?:\\)\\?\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}:\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\)\\$/iu,
            "type": "ip",
          },
        ]
      `)
    })
  })

  describe('ipv4', () => {
    test('should validate valid IPv4 address', () => {
      // Arrange
      const action = { name: 'ipv4', options: {} } as const

      // Act
      const validatedSchema = ipv4(v.string(), action)
      const result = v.safeParse(validatedSchema, '192.168.1.1')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid IPv4 address', () => {
      // Arrange
      const action = { name: 'ipv4', options: {} } as const

      // Act
      const validatedSchema = ipv4(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid IPv4: Received "not an ip"",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\(\\?:\\\\\\.\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\)\\{3\\}\\$/u,
            "type": "ipv4",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'ipv4',
        options: { message: 'Custom IPv4 error' },
      } as const

      // Act
      const validatedSchema = ipv4(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom IPv4 error",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\(\\?:\\\\\\.\\(\\?:\\(\\?:\\[1-9\\]\\|1\\\\d\\|2\\[0-4\\]\\)\\?\\\\d\\|25\\[0-5\\]\\)\\)\\{3\\}\\$/u,
            "type": "ipv4",
          },
        ]
      `)
    })
  })

  describe('ipv6', () => {
    test('should validate valid IPv6 address', () => {
      // Arrange
      const action = { name: 'ipv6', options: {} } as const

      // Act
      const validatedSchema = ipv6(v.string(), action)
      const result = v.safeParse(
        validatedSchema,
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      )

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid IPv6 address', () => {
      // Arrange
      const action = { name: 'ipv6', options: {} } as const

      // Act
      const validatedSchema = ipv6(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid IPv6: Received "not an ip"",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,7\\}:\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,6\\}:\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,5\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,2\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,3\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,3\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,2\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,5\\}\\|\\[\\\\da-f\\]\\{1,4\\}:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,6\\}\\|:\\(\\?:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,7\\}\\|:\\)\\|fe80:\\(\\?::\\[\\\\da-f\\]\\{0,4\\}\\)\\{0,4\\}%\\[\\\\da-z\\]\\+\\|::\\(\\?:f\\{4\\}\\(\\?::0\\{1,4\\}\\)\\?:\\)\\?\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}:\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\)\\$/iu,
            "type": "ipv6",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'ipv6',
        options: { message: 'Custom IPv6 error' },
      } as const

      // Act
      const validatedSchema = ipv6(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not an ip')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not an ip",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom IPv6 error",
            "path": undefined,
            "received": ""not an ip"",
            "requirement": /\\^\\(\\?:\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{7\\}\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,7\\}:\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,6\\}:\\[\\\\da-f\\]\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,5\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,2\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,3\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,3\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,4\\}\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,2\\}\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,5\\}\\|\\[\\\\da-f\\]\\{1,4\\}:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,6\\}\\|:\\(\\?:\\(\\?::\\[\\\\da-f\\]\\{1,4\\}\\)\\{1,7\\}\\|:\\)\\|fe80:\\(\\?::\\[\\\\da-f\\]\\{0,4\\}\\)\\{0,4\\}%\\[\\\\da-z\\]\\+\\|::\\(\\?:f\\{4\\}\\(\\?::0\\{1,4\\}\\)\\?:\\)\\?\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\|\\(\\?:\\[\\\\da-f\\]\\{1,4\\}:\\)\\{1,4\\}:\\(\\?:\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\\\\\.\\)\\{3\\}\\(\\?:25\\[0-5\\]\\|\\(\\?:2\\[0-4\\]\\|1\\?\\\\d\\)\\?\\\\d\\)\\)\\$/iu,
            "type": "ipv6",
          },
        ]
      `)
    })
  })
})
