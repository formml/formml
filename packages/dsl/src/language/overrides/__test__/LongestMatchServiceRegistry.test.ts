import { URI } from 'langium'

import LongestMatchServiceRegistry from '../LongestMatchServiceRegistry.js'

describe('LongestMatchServiceRegistry', () => {
  describe('getServices', () => {
    test('should throw if no services is registered', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry()

      // Act & Assert
      expect(() =>
        registry.getServices(URI.parse('file:///anything')),
      ).toThrow()
    })

    test('should return the singleton if it exists given anything', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry()
      const services = {} as never
      registry.register(services)

      // Act
      const result = registry.getServices(URI.parse('file:///anything'))

      // Assert
      expect(result).toBe(services)
    })

    test('should get by extension if multiple services are registered', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry()
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.xml'],
        },
      } as never
      registry.register(services1)
      registry.register(services2)

      // Act
      const result1 = registry.getServices(URI.parse('file:///test.txt'))
      const result2 = registry.getServices(URI.parse('file:///test.xml'))

      // Assert
      expect(result1).toBe(services1)
      expect(result2).toBe(services2)
    })

    test('should get the longest matched services if extension matches multiple services', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry()
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.abc.txt'],
        },
      } as never
      registry.register(services1)
      registry.register(services2)

      // Act
      const result1 = registry.getServices(URI.parse('file:///test.txt'))
      const result2 = registry.getServices(URI.parse('file:///test.abc.txt'))

      // Assert
      expect(result1).toBe(services1)
      expect(result2).toBe(services2)
    })

    test('should throw if no services is found for the given URI', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry()
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.xml'],
        },
      } as never
      registry.register(services1)
      registry.register(services2)

      // Act & Assert
      expect(() =>
        registry.getServices(URI.parse('file:///test.json')),
      ).toThrow()
    })
  })
})
