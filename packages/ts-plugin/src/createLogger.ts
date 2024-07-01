import type tsModule from 'typescript/lib/tsserverlibrary'

export interface Logger {
  error(...messages: string[]): void
  info(...messages: string[]): void
}

const PLUGIN_NAME = '@formml/ts-plugin'

export default function createLogger(
  info: tsModule.server.PluginCreateInfo,
): Logger {
  return {
    error: (...messages: string[]) => {
      info.project.projectService.logger.info(
        `[${PLUGIN_NAME}] - ERROR: ${messages.join(' ')}`,
      )
    },
    info: (...messages: string[]) => {
      info.project.projectService.logger.info(
        `[${PLUGIN_NAME}] ${messages.join(' ')}`,
      )
    },
  }
}
