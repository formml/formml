import { Field, Form } from '@formml/dsl'

import validate from '../index.js'

describe('validate', () => {
  test('should return undefined if valid', () => {
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
    const value = 123

    // Act
    const result = validate(value, schema)

    // Assert
    expect(result).toBeUndefined()
  })

  test('should return object if invalid', () => {
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
    const value = undefined

    // Act
    const result = validate(value, schema)

    // Assert
    expect(result).toEqual({
      message: expect.any(String),
    })
  })
})
