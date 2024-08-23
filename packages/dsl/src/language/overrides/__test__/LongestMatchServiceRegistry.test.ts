import type { LangiumSharedCoreServices } from 'langium'

import { URI } from 'langium'

import LongestMatchServiceRegistry from '../LongestMatchServiceRegistry.js'

describe('LongestMatchServiceRegistry', () => {
  describe('getServices', () => {
    const mockTextDocumentProvider = vi.fn()
    const stubServices = {
      workspace: {
        TextDocuments: { get: mockTextDocumentProvider },
      },
    } as unknown as LangiumSharedCoreServices

    test('should throw if no services is registered', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry(stubServices)

      // Act & Assert
      expect(() =>
        registry.getServices(URI.parse('file:///anything')),
      ).toThrow()
    })

    test('should return the singleton if it exists given anything', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry(stubServices)
      const services = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
          languageId: 'text',
        },
      } as never
      registry.register(services)

      // Act
      const result = registry.getServices(URI.parse('file:///anything'))

      // Assert
      expect(result).toBe(services)
    })

    test('should get by language id if text document exists', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry(stubServices)
      const services = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
          languageId: 'text',
        },
      } as never
      registry.register(services)

      mockTextDocumentProvider.mockReturnValueOnce({
        languageId: 'text',
      })

      // Act
      const result = registry.getServices(URI.parse('file:///test.not-txt')) // should ignore file extension

      // Assert
      expect(result).toBe(services)
    })

    test('should get by extension if multiple services are registered', () => {
      // Arrange
      const registry = new LongestMatchServiceRegistry(stubServices)
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
          languageId: 'text',
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.xml'],
          languageId: 'xml',
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
      const registry = new LongestMatchServiceRegistry(stubServices)
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
          languageId: 'text',
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.abc.txt'],
          languageId: 'abc-text',
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
      const registry = new LongestMatchServiceRegistry(stubServices)
      const services1 = {
        LanguageMetaData: {
          fileExtensions: ['.txt'],
          languageId: 'text',
        },
      } as never
      const services2 = {
        LanguageMetaData: {
          fileExtensions: ['.xml'],
          languageId: 'xml',
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
