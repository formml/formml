import { Model, createParser } from '@formml/dsl'
import Client from '../client'

describe('client', () => {
  const parser = createParser()

  describe('set & get', () => {
    test.each([
      { type: 'string', value: 'something' },
      { type: 'number', value: '1.23' },
      { type: 'date', value: '20230101' },
    ])('should set value by string into a $type field', ({ type, value }) => {
      // Arrange
      const dsl = `form TestForm { ${type} testField }`
      const ast = parser.parse<Model>(dsl).value
      const client = new Client(ast)

      // Act
      client.set('testField', value)

      // Assert
      expect(client.get('testField')).toEqual(value)
    })

    test.each([
      { type: 'string', value: false },
      { type: 'string', value: true },
      { type: 'number', value: false },
      { type: 'number', value: true },
      { type: 'date', value: false },
      { type: 'date', value: true },
    ])(
      'should throw error when set value by boolean into a $type field',
      ({ type, value }) => {
        // Arrange
        const dsl = `form TestForm { ${type} testField }`
        const ast = parser.parse<Model>(dsl).value
        const client = new Client(ast)

        // Act & Assert
        expect(() => client.set('testField', value)).toThrow(
          `Cannot set a boolean value into a ${type} field.`
        )
      }
    )

    test.each([true, false])(
      'should set value by boolean into a boolean field',
      (value) => {
        // Arrange
        const dsl = `form TestForm { boolean testField }`
        const ast = parser.parse<Model>(dsl).value
        const client = new Client(ast)

        // Act
        client.set('testField', value)

        // Assert
        expect(client.get('testField')).toEqual(value)
      }
    )

    test('should throw error when set value by string into a boolean field', () => {
      // Arrange
      const dsl = `form TestForm { boolean testField }`
      const ast = parser.parse<Model>(dsl).value
      const client = new Client(ast)

      // Act & Assert
      expect(() => client.set('testField', 'anything')).toThrow(
        `Cannot set a string value into a boolean field.`
      )
    })
  })

  describe.todo('getTyped')
})
