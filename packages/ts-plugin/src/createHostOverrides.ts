import type tsModule from 'typescript/lib/tsserverlibrary'

import * as fs from 'node:fs'

import { Logger } from './createLogger'

export default function createHostOverrides(
  origin: tsModule.LanguageServiceHost,
  ts: typeof tsModule,
  logger: Logger,
): Partial<tsModule.LanguageServiceHost> {
  return {
    getScriptKind: (fileName: string) => {
      if (isFormmlFile(fileName)) {
        logger.info(
          '["getScriptKind"]',
          'Intercepted formml file script kind query:',
          fileName,
        )
        return ts.ScriptKind.TS
      }
      return origin.getScriptKind?.(fileName) ?? ts.ScriptKind.Unknown
    },
    getScriptSnapshot: (fileName) => {
      if (isFormmlFile(fileName)) {
        logger.info(
          '["getScriptSnapshot"]',
          'Intercepted formml file script snapshot query:',
          fileName,
        )
        return undefined
      }
      return origin.getScriptSnapshot(fileName)
    },
    resolveModuleNameLiterals: (moduleLiterals, containingFile, ...rest) => {
      const resolvedModules =
        origin.resolveModuleNameLiterals?.(
          moduleLiterals,
          containingFile,
          ...rest,
        ) ?? []

      return resolvedModules.map((resolvedModule, index) => {
        const moduleLiteral = moduleLiterals[index]
        if (!isFormmlFile(moduleLiteral.text)) {
          return resolvedModule
        }

        const { failedLookupLocations } = resolvedModule as unknown as {
          failedLookupLocations: readonly string[]
        }
        const lookupLocations = failedLookupLocations.map((location) =>
          location.replace(/\.formml[./\\].+/, '.formml'),
        )
        const formmlFilePath = lookupLocations.find(fs.existsSync)

        if (!formmlFilePath) {
          return resolvedModule
        }

        logger.info(
          '["resolveModuleNameLiterals"]',
          'Intercepted formml file import resolving, resolved',
          `"${moduleLiteral.text}"`,
          'to',
          formmlFilePath,
        )

        return {
          resolvedModule: {
            extension: ts.Extension.Dts,
            isExternalLibraryImport: false,
            resolvedFileName: formmlFilePath,
          },
        }
      })
    },
  }
}

function isFormmlFile(fileName: string) {
  return fileName.endsWith('.formml')
}
