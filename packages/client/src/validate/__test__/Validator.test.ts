import { Field, Form } from '@formml/dsl'

import Validator from '../Validator.js'

describe('Validator', () => {
  test('should validate a field given its schema', () => {
    // Arrange
    const schema: Field = {
      $container: {} as Form,
      $type: 'Field',
      annotations: [
        {
          $container: {} as Field,
          $type: 'Annotation',
          name: 'required',
        },
      ],
      name: 'numberField',
      type: 'num',
    }
    const validator = new Validator(schema)

    // Act
    const result = validator.validate(123)

    // Assert
    expect(result.isValid).toBe(true)
    expect(result.errors).toBeUndefined()
  })

  test('should invalidate a field if it is not aligned with schema', () => {
    // Arrange
    const schema: Field = {
      $container: {} as Form,
      $type: 'Field',
      annotations: [
        {
          $container: {} as Field,
          $type: 'Annotation',
          name: 'required',
        },
      ],
      name: 'numberField',
      type: 'num',
    }
    const validator = new Validator(schema)

    // Act
    const result = validator.validate(undefined)

    // Assert
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual([
      expect.objectContaining({
        message: expect.any(String),
      }),
    ])
  })
})
