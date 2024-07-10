import type tsModule from 'typescript/lib/tsserverlibrary'

import createHostOverrides from './createHostOverrides'
import createLogger from './createLogger'
import createProxy from './createProxy'

const init: tsModule.server.PluginModuleFactory = ({ typescript: ts }) => {
  function create(info: tsModule.server.PluginCreateInfo) {
    const logger = createLogger(info)
    logger.info('Initializing plugin')

    logger.info('Proxying language service host')
    const languageServiceHostProxy = createProxy(
      info.languageServiceHost,
      createHostOverrides(info.languageServiceHost, ts, logger),
    )

    const service = ts.createLanguageService(languageServiceHostProxy)
    logger.info('Replaced language service with new instance')
    return service
  }

  return { create }
}

module.exports = init
