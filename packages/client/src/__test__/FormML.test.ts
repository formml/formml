import FormML from '../FormML.js'

describe('FormML', () => {
  describe('constructor', () => {
    test('should throw if schema is invalid', () => {
      // Arrange
      const invalidSchema = `form {}`

      // Act & Assert
      expect(() => new FormML(invalidSchema)).toThrow()
    })
  })

  describe('getField', () => {
    test('should throw if index can not be recognized', () => {
      // Arrange
      const schema = `
        form ExampleForm {
          Number   numberField
          Currency currencyField
          Text     textField
          Boolean	 booleanField
          Date		 dateField
        }
      `
      const formML = new FormML(schema)

      // Act & Assert
      const invalidIndex = {}
      expect(() => formML.getField(invalidIndex)).toThrow()
    })
  })
})
