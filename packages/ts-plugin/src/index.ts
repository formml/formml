import type tsModule from 'typescript/lib/tsserverlibrary'

import createHostOverrides from './createHostOverrides'
import createLogger from './createLogger'
import createProxy from './createProxy'
import isFormmlFile from './isFormmlFile'

const init: tsModule.server.PluginModuleFactory = ({ typescript: ts }) => {
  function create(info: tsModule.server.PluginCreateInfo) {
    const logger = createLogger(info)
    logger.info('Initializing plugin')

    logger.info('Proxying language service host')
    const languageServiceHostProxy = createProxy(
      info.languageServiceHost,
      createHostOverrides(info.languageServiceHost, ts, logger),
    )

    const service = ts.createLanguageService(
      languageServiceHostProxy,
      (
        info.project as unknown as {
          documentRegistry: tsModule.DocumentRegistry
        }
      ).documentRegistry, // private property, but is necessary to create language service as same as tsserver
      info.project.projectService.serverMode,
    )
    logger.info('Replaced language service with new instance')
    return service
  }

  function getExternalFiles(
    project: tsModule.server.ConfiguredProject,
  ): string[] {
    return project.getFileNames().filter(isFormmlFile)
  }

  return { create, getExternalFiles }
}

module.exports = init
