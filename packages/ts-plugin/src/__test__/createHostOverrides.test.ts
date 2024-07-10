import * as fs from 'node:fs'
import ts from 'typescript/lib/tsserverlibrary'

import createHostOverrides from '../createHostOverrides'
import generateTsSync from '../external/generateTsSync'

vi.mock('node:fs')
vi.mock('../external/generateTsSync')

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

    test('should resolve non-formml files as is', () => {
      // Arrange
      const dummyResolvedModule = {}
      mockedOriginalResolver.mockReturnValue([dummyResolvedModule])

      const moduleLiteral = ts.factory.createStringLiteral(
        './foo/non-formml-file.js',
      )

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

    test.each([
      {
        // NodeNext
        failedLookupLocations: [
          '/root/project/src/foo/formml-file.d.formml.ts',
        ],
      },
      {
        // ES
        failedLookupLocations: [
          '/root/project/src/foo/formml-file.d.formml.ts',
          '/root/project/src/foo/formml-file.formml.ts',
          '/root/project/src/foo/formml-file.formml.tsx',
          '/root/project/src/foo/formml-file.formml.d.ts',
          '/root/project/src/foo/formml-file.formml.js',
          '/root/project/src/foo/formml-file.formml.jsx',
        ],
      },
    ])(
      'should resolve to full file path for formml files - relative path import',
      ({ failedLookupLocations }) => {
        // Arrange
        mockedOriginalResolver.mockReturnValue([
          {
            failedLookupLocations,
          },
        ])
        const expectedFilePath = '/root/project/src/foo/formml-file.formml'
        vi.mocked(fs.existsSync).mockImplementation(
          (path) => path === expectedFilePath,
        )

        const moduleLiteral = ts.factory.createStringLiteral(
          './foo/formml-file.formml',
        )

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
      },
    )

    test.each([
      {
        // NodeNext
        failedLookupLocations: [
          '/somewhere/node_modules/external/dist/formml-file.d.formml.ts',
        ],
      },
      {
        // ES
        failedLookupLocations: [
          '/somewhere/node_modules/external/dist/formml-file.d.formml.ts',
          '/somewhere/node_modules/external/dist/formml-file.formml.ts',
          '/somewhere/node_modules/external/dist/formml-file.formml.tsx',
          '/somewhere/node_modules/external/dist/formml-file.formml.d.ts',
          '/somewhere/node_modules/external/dist/formml-file.formml.js',
          '/somewhere/node_modules/external/dist/formml-file.formml.jsx',
        ],
      },
    ])(
      'should resolve to full file path for formml files - external module import',
      ({ failedLookupLocations }) => {
        // Arrange
        mockedOriginalResolver.mockReturnValue([
          {
            failedLookupLocations,
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
      },
    )
  })

  describe('getScriptKind', () => {
    const mockedOriginalMethod = vi.fn()
    const origin = {
      getScriptKind: mockedOriginalMethod,
    } as unknown as ts.LanguageServiceHost

    test('should return original result if file extension is not .formml', () => {
      // Arrange
      const dummyResult = {}
      mockedOriginalMethod.mockReturnValue(dummyResult)

      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptKind!(
        '/root/project/src/index.js',
      )

      // Assert
      expect(result).toBe(dummyResult)
      expect(origin.getScriptKind).toHaveBeenCalledWith(
        '/root/project/src/index.js',
      )
    })

    test('should always return "TS" if file extension is .formml', () => {
      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptKind!(
        '/root/project/src/index.formml',
      )

      // Assert
      expect(result).toBe(ts.ScriptKind.TS)
      expect(origin.getScriptKind).not.toHaveBeenCalled()
    })
  })

  describe('getScriptSnapshot', () => {
    const mockedOriginalMethod = vi.fn()
    const origin = {
      getScriptSnapshot: mockedOriginalMethod,
    } as unknown as ts.LanguageServiceHost

    test('should return original result if file extension is not .formml', () => {
      // Arrange
      const dummyResult = {}
      mockedOriginalMethod.mockReturnValue(dummyResult)

      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptSnapshot!(
        '/root/project/src/index.js',
      )

      // Assert
      expect(result).toBe(dummyResult)
      expect(origin.getScriptSnapshot).toHaveBeenCalledWith(
        '/root/project/src/index.js',
      )
    })

    test('should return undefined if file extension is .formml but file does not exist', () => {
      // Arrange
      vi.mocked(fs.existsSync).mockReturnValue(false)

      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptSnapshot!(
        '/root/project/src/index.formml',
      )

      // Assert
      expect(result).toBeUndefined()
      expect(origin.getScriptSnapshot).not.toHaveBeenCalled()
    })

    test('should return ts code if file extension is .formml and file exists', () => {
      // Arrange
      vi.mocked(fs.existsSync).mockReturnValue(true)
      const expectedCode = 'const foo = "bar"'
      vi.mocked(generateTsSync).mockReturnValue(expectedCode)

      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptSnapshot!(
        '/root/project/src/index.formml',
      )

      // Assert
      expect(generateTsSync).toBeCalledWith(
        '/root/project/src/index.formml',
        '@formml/ts-plugin/deps',
      )
      expect(result?.getText(0, result.getLength())).toBe(expectedCode)
      expect(origin.getScriptSnapshot).not.toHaveBeenCalled()
    })

    test('should catch error if ts code generation fails', () => {
      // Arrange
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(generateTsSync).mockImplementation(() => {
        throw new Error('Failed to generate ts code')
      })

      // Act
      const result = createHostOverrides(origin, ts, logger).getScriptSnapshot!(
        '/root/project/src/index.formml',
      )

      // Assert
      expect(result).toBeUndefined()
      expect(origin.getScriptSnapshot).not.toHaveBeenCalled()
    })
  })
})
