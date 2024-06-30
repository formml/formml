import type tsModule from 'typescript/lib/tsserverlibrary'

interface Logger {
  error(message: string): void
  info(message: string): void
}

const PLUGIN_NAME = '@formml/ts-plugin'

export default function createLogger(
  info: tsModule.server.PluginCreateInfo,
): Logger {
  return {
    error: (message: string) => {
      info.project.projectService.logger.info(
        `[${PLUGIN_NAME}] - ERROR: ${message}`,
      )
    },
    info: (message: string) => {
      info.project.projectService.logger.info(`[${PLUGIN_NAME}] ${message}`)
    },
  }
}
