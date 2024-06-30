import type tsModule from 'typescript/lib/tsserverlibrary'

import createLogger from './helpers/createLogger'

const init: tsModule.server.PluginModuleFactory = ({ typescript: ts }) => {
  function create(info: tsModule.server.PluginCreateInfo) {
    const logger = createLogger(info)
    logger.info('Initializing plugin')

    logger.info('Proxying language service host')
    const languageServiceHostProxy = new Proxy(info.languageServiceHost, {
      get(target, key: keyof tsModule.LanguageServiceHost) {
        return Reflect.get(target, key)
      },
    })

    const service = ts.createLanguageService(languageServiceHostProxy)
    logger.info('Replaced language service with new instance')
    return service
  }

  return { create }
}

export = init
