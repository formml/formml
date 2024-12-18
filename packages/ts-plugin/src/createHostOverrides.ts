import type tsModule from 'typescript/lib/tsserverlibrary'

import { generateFallbackDts } from '@formml/dsl/generators/generateDts.js'
import * as fs from 'node:fs'
import path from 'node:path'

import type { Logger } from './createLogger'

import generateDtsSync from './external/generateDtsSync'
import isFormmlFile from './isFormmlFile'

export default function createHostOverrides(
  origin: tsModule.LanguageServiceHost,
  ts: typeof tsModule,
  logger: Logger,
): Partial<tsModule.LanguageServiceHost> {
  const FALLBACK_SNAPSHOT = ts.ScriptSnapshot.fromString(
    generateFallbackDts('@formml/ts-plugin/deps'),
  )

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
        if (!fs.existsSync(fileName)) {
          logger.error(
            '["getScriptSnapshot"]',
            'Requested formml file does not exist:',
            fileName,
          )
          return undefined
        }
        try {
          return ts.ScriptSnapshot.fromString(
            generateDtsSync(fileName, '@formml/ts-plugin/deps'),
          )
        } catch (error) {
          logger.error(
            '["getScriptSnapshot"]',
            'Failed to generate TS code for formml file:',
            fileName,
            'error:\n',
            error instanceof Error
              ? error.message
              : JSON.stringify(error, null, 2),
          )
          return FALLBACK_SNAPSHOT
        }
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
        logger.info(
          '["resolveModuleNameLiterals"]',
          'failedLookupLocations:',
          JSON.stringify(failedLookupLocations, null, 2),
        )
        const lookupLocations = failedLookupLocations.map((location) =>
          path.resolve(
            path.dirname(location),
            path.basename(moduleLiteral.text),
          ),
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
