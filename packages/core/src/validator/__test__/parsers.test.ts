import type { Form, FormMLSchema } from '@formml/dsl'

import * as v from 'valibot'

import { buildValibotSchema } from '../buildValibotSchema.js'
import { parse, safeParse } from '../parsers.js'

vi.mock('../buildValibotSchema.js')

vi.mock('valibot', async () => {
  const actual = await vi.importActual('valibot')
  return {
    ...actual,
    parse: vi.fn(),
    safeParse: vi.fn(),
  }
})

describe('parse', () => {
  test('should call buildValibotSchema with correct arguments', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.parse).mockReturnValue(mockData)

    // Act
    parse(mockData, mockSchema)

    // Assert
    const expectedSchemaShape = expect.objectContaining({
      async: false,
      kind: 'schema',
      pipe: [
        expect.anything(),
        expect.objectContaining({
          kind: 'transformation',
          type: 'transform',
        }),
      ],
      type: expect.any(String),
    })
    expect(buildValibotSchema).toBeCalledWith(mockSchema.form, {
      bool: expectedSchemaShape,
      datetime: expectedSchemaShape,
      decimal: expectedSchemaShape,
      num: expectedSchemaShape,
      text: expectedSchemaShape,
    })
  })

  test('should call valibot parse with correct arguments', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.parse).mockReturnValue(mockData)

    // Act
    parse(mockData, mockSchema)

    // Assert
    expect(v.parse).toBeCalledWith(mockValibotSchema, mockData)
  })

  test('should return the parsed data', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }
    const expectedResult = { foo: 'parsed' }

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.parse).mockReturnValue(expectedResult)

    // Act
    const result = parse(mockData, mockSchema)

    // Assert
    expect(result).toBe(expectedResult)
  })

  test('should throw when valibot parse throws', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }
    const mockError = new Error('Validation failed')

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.parse).mockImplementation(() => {
      throw mockError
    })

    // Act & Assert
    expect(() => parse(mockData, mockSchema)).toThrow(mockError)
  })
})

describe('safeParse', () => {
  test('should call buildValibotSchema with correct arguments', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.safeParse).mockReturnValue({
      issues: undefined,
      output: mockData,
      success: true,
      typed: true,
    })

    // Act
    safeParse(mockData, mockSchema)

    // Assert
    const expectedSchemaShape = expect.objectContaining({
      async: false,
      kind: 'schema',
      pipe: [
        expect.anything(),
        expect.objectContaining({
          kind: 'transformation',
          type: 'transform',
        }),
      ],
      type: expect.any(String),
    })
    expect(buildValibotSchema).toBeCalledWith(mockSchema.form, {
      bool: expectedSchemaShape,
      datetime: expectedSchemaShape,
      decimal: expectedSchemaShape,
      num: expectedSchemaShape,
      text: expectedSchemaShape,
    })
  })

  test('should call valibot safeParse with correct arguments', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.safeParse).mockReturnValue({
      issues: undefined,
      output: mockData,
      success: true,
      typed: true,
    })

    // Act
    safeParse(mockData, mockSchema)

    // Assert
    expect(v.safeParse).toBeCalledWith(mockValibotSchema, mockData)
  })

  test('should return the safe parse result', () => {
    // Arrange
    const mockSchema: FormMLSchema = {
      $type: 'FormMLSchema',
      form: {} as unknown as Form,
    }
    const mockValibotSchema = {} as unknown as v.GenericSchema
    const mockData = { foo: 'bar' }
    const mockValibotResult = {
      issues: undefined,
      output: { foo: 'parsed' },
      success: true,
      typed: true,
    } as const

    vi.mocked(buildValibotSchema).mockReturnValue(mockValibotSchema)
    vi.mocked(v.safeParse).mockReturnValue(mockValibotResult)

    // Act
    const result = safeParse(mockData, mockSchema)

    // Assert
    expect(result).toEqual({
      errors: undefined,
      isValid: true,
      output: { foo: 'parsed' },
      typed: true,
    })
  })
})
