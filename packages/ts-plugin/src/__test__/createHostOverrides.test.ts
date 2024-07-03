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
    test('should resolve non-formml files as is - no import attributes', () => {
      // Arrange
      const dummyResolvedModule = {}
      const origin = {
        resolveModuleNameLiterals: vi
          .fn()
          .mockReturnValue([dummyResolvedModule]),
      } as unknown as ts.LanguageServiceHost
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
      const origin = {
        resolveModuleNameLiterals: vi
          .fn()
          .mockReturnValue([dummyResolvedModule]),
      } as unknown as ts.LanguageServiceHost
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
  })
})
