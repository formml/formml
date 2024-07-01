import type tsModule from 'typescript/lib/tsserverlibrary'

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
      const result = origin.resolveModuleNameLiterals!(
        moduleLiterals,
        containingFile,
        ...rest,
      )
      REGEX.test(containingFile) &&
        logger.info(
          '"resolveModuleNameLiterals" called:',
          '[',
          moduleLiterals.map((x) => x.text).join(', '),
          ']',
          containingFile,
          '=>',
          JSON.stringify(result, null, 2),
        )
      return result
    },
  }
}
