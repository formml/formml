import type tsModule from 'typescript/lib/tsserverlibrary'

import * as fs from 'node:fs'

import { Logger } from './createLogger'

const REGEX = /^((?!node_modules).)*$/

export default function createHostOverrides(
  origin: tsModule.LanguageServiceHost,
  ts: typeof tsModule,
  logger: Logger,
): Partial<tsModule.LanguageServiceHost> {
  return {
    getScriptKind: (fileName: string) => {
      const result = origin.getScriptKind!(fileName)
      REGEX.test(fileName) &&
        logger.info(
          '"getScriptKind" called:',
          fileName,
          '=>',
          ts.ScriptKind[result],
        )
      return result
    },
    getScriptSnapshot: (fileName) => {
      const result = origin.getScriptSnapshot(fileName)
      REGEX.test(fileName) &&
        logger.info(
          '"getScriptSnapshot" called:',
          fileName,
          '=>',
          result ? result.getText(0, result.getLength()) : 'undefined',
        )
      return result
    },
    resolveModuleNameLiterals: (moduleLiterals, containingFile, ...rest) => {
      const resolvedModules =
        origin.resolveModuleNameLiterals?.(
          moduleLiterals,
          containingFile,
          ...rest,
        ) ?? []

      const resolveAttributes = (attributes?: tsModule.ImportAttributes) =>
        attributes?.elements.reduce(
          (acc, element) => {
            if (!ts.isStringLiteralLike(element.value)) {
              logger.info(
                '["resolveModuleNameLiterals"]',
                'Invalid attribute value kind:',
                ts.SyntaxKind[element.value.kind],
              )
              return acc
            }
            return { ...acc, [element.name.text]: element.value.text }
          },
          {} as Record<string, string>,
        ) ?? {}

      return resolvedModules.map((resolvedModule, index) => {
        const moduleLiteral = moduleLiterals[index]
        const importDeclaration = ts.findAncestor(
          moduleLiteral,
          ts.isImportDeclaration, // only support import statements for now
        )
        const attributes = resolveAttributes(importDeclaration?.attributes)

        if (attributes['type'] !== 'formml') {
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
          'Intercepted formml file import, resolved',
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
