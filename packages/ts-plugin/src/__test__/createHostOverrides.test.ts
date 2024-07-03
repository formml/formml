import ts from 'typescript/lib/tsserverlibrary'

import createHostOverrides from '../createHostOverrides'
import createLogger from '../createLogger'

describe('createHostOverrides', () => {
  const logger = createLogger({
    project: {
      projectService: { logger: { info: vi.fn() } },
    },
  } as unknown as ts.server.PluginCreateInfo)

  describe('resolveModuleNameLiterals', () => {
    const mockedOriginalResolver = vi.fn()
    const origin = {
      resolveModuleNameLiterals: mockedOriginalResolver,
    } as unknown as ts.LanguageServiceHost

    test('should resolve non-formml files as is - no import attributes', () => {
      // Arrange
      const dummyResolvedModule = {}
      mockedOriginalResolver.mockReturnValue([dummyResolvedModule])

      const moduleLiteral = ts.factory.createStringLiteral(
        './foo/non-formml-file.js',
      )
      const importDeclaration = ts.factory.createImportDeclaration(
        undefined,
        undefined,
        moduleLiteral,
      )
      Object.assign(moduleLiteral, { parent: importDeclaration })

      // Act
      const args = [
        [moduleLiteral],
        '/root/project/src/index.ts',
        undefined,
        {},
        ts.createSourceFile(
          '/root/project/src/index.ts',
          '',
          ts.ScriptTarget.Latest,
        ),
        undefined,
      ] as const
      const result = createHostOverrides(
        origin,
        ts,
        logger,
      ).resolveModuleNameLiterals?.(...args)

      // Assert
      expect(result).toEqual([dummyResolvedModule])
      expect(origin.resolveModuleNameLiterals).toHaveBeenCalledWith(...args)
    })

    test('should resolve non-formml files as is - other import attributes', () => {
      // Arrange
      const dummyResolvedModule = {}
      mockedOriginalResolver.mockReturnValue([dummyResolvedModule])

      const moduleLiteral = ts.factory.createStringLiteral(
        './foo/non-formml-file.js',
      )
      const importDeclaration = ts.factory.createImportDeclaration(
        undefined,
        undefined,
        moduleLiteral,
        ts.factory.createImportAttributes(
          ts.factory.createNodeArray([
            ts.factory.createImportAttribute(
              ts.factory.createIdentifier('foo'),
              ts.factory.createStringLiteral('bar'),
            ),
          ]),
        ),
      )
      Object.assign(moduleLiteral, { parent: importDeclaration })

      // Act
      const args = [
        [moduleLiteral],
        '/root/project/src/index.ts',
        undefined,
        {},
        ts.createSourceFile(
          '/root/project/src/index.ts',
          '',
          ts.ScriptTarget.Latest,
        ),
        undefined,
      ] as const
      const result = createHostOverrides(
        origin,
        ts,
        logger,
      ).resolveModuleNameLiterals?.(...args)

      // Assert
      expect(result).toEqual([dummyResolvedModule])
      expect(origin.resolveModuleNameLiterals).toHaveBeenCalledWith(...args)
    })

    test('should resolve to full file path if import has "formml" type attribute - relative import path', () => {
      // Arrange
      mockedOriginalResolver.mockReturnValue([{}])

      const moduleLiteral = ts.factory.createStringLiteral(
        './foo/formml-file.formml',
      )
      const importDeclaration = ts.factory.createImportDeclaration(
        undefined,
        undefined,
        moduleLiteral,
        ts.factory.createImportAttributes(
          ts.factory.createNodeArray([
            ts.factory.createImportAttribute(
              ts.factory.createIdentifier('type'),
              ts.factory.createStringLiteral('formml'),
            ),
          ]),
        ),
      )
      Object.assign(moduleLiteral, { parent: importDeclaration })

      // Act
      const result = createHostOverrides(
        origin,
        ts,
        logger,
      ).resolveModuleNameLiterals?.(
        [moduleLiteral],
        '/root/project/src/index.ts',
        undefined,
        {},
        ts.createSourceFile(
          '/root/project/src/index.ts',
          '',
          ts.ScriptTarget.Latest,
        ),
        undefined,
      )

      // Assert
      expect(result).toEqual([
        {
          resolvedModule: {
            extension: '.d.ts',
            isExternalLibraryImport: false,
            resolvedFileName: '/root/project/src/foo/formml-file.formml',
          },
        },
      ])
    })
  })
})
