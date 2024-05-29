import { mergeOptions } from '../options.js'

describe('options', () => {
  describe('mergeOptions', () => {
    test('should apply default options if given option is undefined', () => {
      // Arrange
      const defaultOptions = {
        baz: 123,
        foo: 'bar',
      }

      // Act
      const options = mergeOptions(undefined, defaultOptions)

      // Assert
      expect(options).toEqual(defaultOptions)
    })
  })
})
