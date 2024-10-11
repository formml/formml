import type { Form, FormMLSchema } from '@formml/dsl'
import type { BaseIssue } from 'valibot'

import { safeParse } from 'valibot'
import { describe, expect, test, vi } from 'vitest'

import buildSchema from '../buildSchema.js'
import { validate } from '../index.js'

vi.mock('valibot')
vi.mock('../buildSchema.js')

describe('validate function', () => {
  const mockSchema: FormMLSchema = {
    $type: 'FormMLSchema',
    form: {
      $container: {} as FormMLSchema,
      $type: 'Form',
      fields: [
        {
          $container: {} as Form,
          $type: 'Field',
          annotations: [],
          name: 'textField',
          type: 'text',
        },
      ],
      name: 'form',
    },
  }

  const mockValibotSchema = {} as never

  beforeEach(() => {
    vi.mocked(buildSchema).mockReturnValue(mockValibotSchema)
  })

  test('should return isValid true when validation succeeds', () => {
    // Arrange
    vi.mocked(safeParse).mockReturnValue({
      issues: undefined,
      output: undefined,
      success: true,
      typed: true,
    })

    // Act
    const result = validate({ textField: 'value' }, mockSchema)

    // Assert
    expect(buildSchema).toBeCalledWith(mockSchema.form)
    expect(safeParse).toBeCalledWith(mockValibotSchema, {
      textField: 'value',
    })
    expect(result).toEqual({ errors: undefined, isValid: true })
  })

  test('should return isValid false and errors when validation fails', () => {
    // Arrange
    vi.mocked(safeParse).mockReturnValue({
      issues: [{ message: 'Error message' } as BaseIssue<unknown>],
      output: undefined,
      success: false,
      typed: true,
    })

    // Act
    const result = validate({ textField: 123 }, mockSchema)

    // Assert
    expect(buildSchema).toBeCalledWith(mockSchema.form)
    expect(safeParse).toBeCalledWith(mockValibotSchema, {
      textField: 123,
    })
    expect(result).toEqual({
      errors: [{ message: 'Error message' }],
      isValid: false,
    })
  })
})
