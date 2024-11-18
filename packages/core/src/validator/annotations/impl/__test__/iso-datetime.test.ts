import * as v from 'valibot'

import {
  isoDate,
  isoDateTime,
  isoTime,
  isoTimeSecond,
  isoTimestamp,
  isoWeek,
} from '../iso-datetime.js'

describe('ISO datetime validators', () => {
  describe('isoDate', () => {
    test('should validate valid ISO date', () => {
      // Arrange
      const action = { name: 'isoDate', options: {} } as const

      // Act
      const validatedSchema = isoDate(v.string(), action)
      const result = v.safeParse(validatedSchema, '2023-12-25')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO date', () => {
      // Arrange
      const action = { name: 'isoDate', options: {} } as const

      // Act
      const validatedSchema = isoDate(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a date')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a date",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid date: Received "not a date"",
            "path": undefined,
            "received": ""not a date"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)\\$/u,
            "type": "iso_date",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoDate',
        options: { message: 'Custom ISO date error' },
      } as const

      // Act
      const validatedSchema = isoDate(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a date')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a date",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO date error",
            "path": undefined,
            "received": ""not a date"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)\\$/u,
            "type": "iso_date",
          },
        ]
      `)
    })
  })

  describe('isoDateTime', () => {
    test('should validate valid ISO datetime', () => {
      // Arrange
      const action = { name: 'isoDateTime', options: {} } as const

      // Act
      const validatedSchema = isoDateTime(v.string(), action)
      const result = v.safeParse(validatedSchema, '2024-01-01T12:00')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO datetime', () => {
      // Arrange
      const action = { name: 'isoDateTime', options: {} } as const

      // Act
      const validatedSchema = isoDateTime(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a datetime')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a datetime",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid date-time: Received "not a datetime"",
            "path": undefined,
            "received": ""not a datetime"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)T\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\):\\[0-5\\]\\\\d\\$/u,
            "type": "iso_date_time",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoDateTime',
        options: { message: 'Custom ISO datetime error' },
      } as const

      // Act
      const validatedSchema = isoDateTime(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a datetime')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a datetime",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO datetime error",
            "path": undefined,
            "received": ""not a datetime"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)T\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\):\\[0-5\\]\\\\d\\$/u,
            "type": "iso_date_time",
          },
        ]
      `)
    })
  })

  describe('isoTime', () => {
    test('should validate valid ISO time', () => {
      // Arrange
      const action = { name: 'isoTime', options: {} } as const

      // Act
      const validatedSchema = isoTime(v.string(), action)
      const result = v.safeParse(validatedSchema, '12:00')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO time', () => {
      // Arrange
      const action = { name: 'isoTime', options: {} } as const

      // Act
      const validatedSchema = isoTime(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a time')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a time",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid time: Received "not a time"",
            "path": undefined,
            "received": ""not a time"",
            "requirement": /\\^\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\):\\[0-5\\]\\\\d\\$/u,
            "type": "iso_time",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoTime',
        options: { message: 'Custom ISO time error' },
      } as const

      // Act
      const validatedSchema = isoTime(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a time')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a time",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO time error",
            "path": undefined,
            "received": ""not a time"",
            "requirement": /\\^\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\):\\[0-5\\]\\\\d\\$/u,
            "type": "iso_time",
          },
        ]
      `)
    })
  })

  describe('isoTimeSecond', () => {
    test('should validate valid ISO time with seconds', () => {
      // Arrange
      const action = { name: 'isoTimeSecond', options: {} } as const

      // Act
      const validatedSchema = isoTimeSecond(v.string(), action)
      const result = v.safeParse(validatedSchema, '12:00:00')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO time with seconds', () => {
      // Arrange
      const action = { name: 'isoTimeSecond', options: {} } as const

      // Act
      const validatedSchema = isoTimeSecond(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a time')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a time",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid time-second: Received "not a time"",
            "path": undefined,
            "received": ""not a time"",
            "requirement": /\\^\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\[0-5\\]\\\\d\\)\\{2\\}\\$/u,
            "type": "iso_time_second",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoTimeSecond',
        options: { message: 'Custom ISO time second error' },
      } as const

      // Act
      const validatedSchema = isoTimeSecond(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a time')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a time",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO time second error",
            "path": undefined,
            "received": ""not a time"",
            "requirement": /\\^\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\[0-5\\]\\\\d\\)\\{2\\}\\$/u,
            "type": "iso_time_second",
          },
        ]
      `)
    })
  })

  describe('isoTimestamp', () => {
    test('should validate valid ISO timestamp', () => {
      // Arrange
      const action = { name: 'isoTimestamp', options: {} } as const

      // Act
      const validatedSchema = isoTimestamp(v.string(), action)
      const result = v.safeParse(validatedSchema, '2023-12-25T12:00:00.000Z')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO timestamp', () => {
      // Arrange
      const action = { name: 'isoTimestamp', options: {} } as const

      // Act
      const validatedSchema = isoTimestamp(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a timestamp')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a timestamp",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid timestamp: Received "not a timestamp"",
            "path": undefined,
            "received": ""not a timestamp"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)T\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\[0-5\\]\\\\d\\)\\{2\\}\\(\\?:\\\\\\.\\\\d\\{1,9\\}\\)\\?\\(\\?:Z\\|\\[\\+-\\]\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\?\\[0-5\\]\\\\d\\)\\?\\)\\$/u,
            "type": "iso_timestamp",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoTimestamp',
        options: { message: 'Custom ISO timestamp error' },
      } as const

      // Act
      const validatedSchema = isoTimestamp(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a timestamp')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a timestamp",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO timestamp error",
            "path": undefined,
            "received": ""not a timestamp"",
            "requirement": /\\^\\\\d\\{4\\}-\\(\\?:0\\[1-9\\]\\|1\\[0-2\\]\\)-\\(\\?:\\[12\\]\\\\d\\|0\\[1-9\\]\\|3\\[01\\]\\)T\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\[0-5\\]\\\\d\\)\\{2\\}\\(\\?:\\\\\\.\\\\d\\{1,9\\}\\)\\?\\(\\?:Z\\|\\[\\+-\\]\\(\\?:0\\\\d\\|1\\\\d\\|2\\[0-3\\]\\)\\(\\?::\\?\\[0-5\\]\\\\d\\)\\?\\)\\$/u,
            "type": "iso_timestamp",
          },
        ]
      `)
    })
  })

  describe('isoWeek', () => {
    test('should validate valid ISO week', () => {
      // Arrange
      const action = { name: 'isoWeek', options: {} } as const

      // Act
      const validatedSchema = isoWeek(v.string(), action)
      const result = v.safeParse(validatedSchema, '2023-W52')

      // Assert
      expect(result.success).toBe(true)
    })

    test('should reject invalid ISO week', () => {
      // Arrange
      const action = { name: 'isoWeek', options: {} } as const

      // Act
      const validatedSchema = isoWeek(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a week')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a week",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Invalid week: Received "not a week"",
            "path": undefined,
            "received": ""not a week"",
            "requirement": /\\^\\\\d\\{4\\}-W\\(\\?:0\\[1-9\\]\\|\\[1-4\\]\\\\d\\|5\\[0-3\\]\\)\\$/u,
            "type": "iso_week",
          },
        ]
      `)
    })

    test('should use custom error message', () => {
      // Arrange
      const action = {
        name: 'isoWeek',
        options: { message: 'Custom ISO week error' },
      } as const

      // Act
      const validatedSchema = isoWeek(v.string(), action)
      const result = v.safeParse(validatedSchema, 'not a week')

      // Assert
      expect(result.success).toBe(false)
      expect(result.issues).toMatchInlineSnapshot(`
        [
          {
            "abortEarly": undefined,
            "abortPipeEarly": undefined,
            "expected": null,
            "input": "not a week",
            "issues": undefined,
            "kind": "validation",
            "lang": undefined,
            "message": "Custom ISO week error",
            "path": undefined,
            "received": ""not a week"",
            "requirement": /\\^\\\\d\\{4\\}-W\\(\\?:0\\[1-9\\]\\|\\[1-4\\]\\\\d\\|5\\[0-3\\]\\)\\$/u,
            "type": "iso_week",
          },
        ]
      `)
    })
  })
})
