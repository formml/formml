import * as fs from 'node:fs'
import ts from 'typescript/lib/tsserverlibrary'

import createHostOverrides from '../createHostOverrides'

vi.mock('node:fs')

describe('createHostOverrides', () => {
  const logger = {
    error: vi.fn(),
    info: vi.fn(),
  }

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

    test('should resolve to full file path if import has "formml" type attribute - relative path import', () => {
      // Arrange
      mockedOriginalResolver.mockReturnValue([
        {
          failedLookupLocations: [
            '/root/project/src/foo/formml-file.d.formml.ts',
            '/root/project/src/foo/formml-file.formml.ts',
            '/root/project/src/foo/formml-file.formml.tsx',
            '/root/project/src/foo/formml-file.formml.d.ts',
            '/root/project/src/foo/formml-file.formml.js',
            '/root/project/src/foo/formml-file.formml.jsx',
          ],
        },
      ])
      const expectedFilePath = '/root/project/src/foo/formml-file.formml'
      vi.mocked(fs.existsSync).mockImplementation(
        (path) => path === expectedFilePath,
      )

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
            resolvedFileName: expectedFilePath,
          },
        },
      ])
    })

    test('should resolve to full file path if import has "formml" type attribute - external module import', () => {
      // Arrange
      mockedOriginalResolver.mockReturnValue([
        {
          failedLookupLocations: [
            '/somewhere/node_modules/external/dist/formml-file.d.formml.ts',
            '/somewhere/node_modules/external/dist/formml-file.formml.ts',
            '/somewhere/node_modules/external/dist/formml-file.formml.tsx',
            '/somewhere/node_modules/external/dist/formml-file.formml.d.ts',
            '/somewhere/node_modules/external/dist/formml-file.formml.js',
            '/somewhere/node_modules/external/dist/formml-file.formml.jsx',
          ],
        },
      ])
      const expectedFilePath =
        '/somewhere/node_modules/external/dist/formml-file.formml'
      vi.mocked(fs.existsSync).mockImplementation(
        (path) => path === expectedFilePath,
      )

      const moduleLiteral = ts.factory.createStringLiteral(
        'external/formml-file.formml',
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
            resolvedFileName: expectedFilePath,
          },
        },
      ])
    })
  })
})
