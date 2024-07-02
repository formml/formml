import type tsModule from 'typescript/lib/tsserverlibrary'

import { Logger } from './createLogger'

const REGEX = /^((?!node_modules).)*$/

export default function createHostOverrides(
  origin: tsModule.LanguageServiceHost,
  ts: typeof tsModule,
  logger: Logger,
): Partial<tsModule.LanguageServiceHost> {
  const resolveAttributes = (attributes?: tsModule.ImportAttributes) =>
    attributes?.elements.reduce(
      (acc, element) => {
        if (!ts.isStringLiteralLike(element.value)) {
          logger.info(
            'Invalid attribute value kind:',
            ts.SyntaxKind[element.value.kind],
          )
          return acc
        }
        return { ...acc, [element.name.text]: element.value.text }
      },
      {} as Record<string, string>,
    )

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
      const result = origin.resolveModuleNameLiterals!(
        moduleLiterals,
        containingFile,
        ...rest,
      )
      REGEX.test(containingFile) &&
        logger.info(
          '"resolveModuleNameLiterals" called:',
          JSON.stringify(
            moduleLiterals.map((x) => {
              const importStatement = ts.findAncestor(
                x,
                (x) => ts.isImportDeclaration(x) || ts.isImportTypeNode(x),
              ) as
                | tsModule.ImportDeclaration
                | tsModule.ImportTypeNode
                | undefined
              if (importStatement) {
                return {
                  attributes: resolveAttributes(importStatement.attributes),
                  module: x.text,
                  statementKind: ts.SyntaxKind[importStatement.kind],
                }
              }
              return {
                module: x.text,
                parentKind: ts.SyntaxKind[x.parent.kind],
              }
            }),
            null,
            2,
          ),
          containingFile,
          '=>',
          JSON.stringify(result, null, 2),
        )
      return result
    },
  }
}
