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

    test('should apply default options if do not provide any options', () => {
      // Arrange
      const defaultOptions = {
        baz: 123,
        foo: 'bar',
      }

      // Act
      const options = mergeOptions({}, defaultOptions)

      // Assert
      expect(options).toEqual(defaultOptions)
    })

    test('should apply given options if provided', () => {
      // Arrange
      const defaultOptions = {
        baz: 123,
        foo: 'bar',
      }
      const givenOptions = {
        baz: 456,
        foo: 'car',
      }

      // Act
      const options = mergeOptions(givenOptions, defaultOptions)

      // Assert
      expect(options).toEqual({
        baz: 456,
        foo: 'car',
      })
    })

    test('should merge given options and default options', () => {
      // Arrange
      const defaultOptions = {
        baz: 123,
        foo: 'bar',
      }
      const givenOptions = {
        baz: 456,
      }

      // Act
      const options = mergeOptions(givenOptions, defaultOptions)

      // Assert
      expect(options).toEqual({
        baz: 456,
        foo: 'bar',
      })
    })
  })
})
