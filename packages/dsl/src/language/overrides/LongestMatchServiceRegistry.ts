import {
  DefaultServiceRegistry,
  LangiumCoreServices,
  URI,
  UriUtils,
} from 'langium'

export default class LongestMatchServiceRegistry extends DefaultServiceRegistry {
  override getServices(uri: URI): LangiumCoreServices {
    if (this.singleton !== undefined) {
      return this.singleton
    }
    if (this.languageIdMap.size === 0) {
      throw new Error(
        'The service registry is empty. Use `register` to register the services of a language.',
      )
    }
    const languageId = this.textDocuments?.get(uri.toString())?.languageId
    if (languageId !== undefined) {
      const services = this.languageIdMap.get(languageId)
      if (services) {
        return services
      }
    }
    const fileName = UriUtils.basename(uri)
    const knownExtensionsDesc = [...this.fileExtensionMap.keys()].sort(
      (a, b) => b.length - a.length,
    )
    const matchedExtension = knownExtensionsDesc.find((ext) =>
      fileName.endsWith(ext),
    )
    if (!matchedExtension) {
      const ext = UriUtils.extname(uri)
      if (languageId) {
        throw new Error(
          `The service registry contains no services for the extension '${ext}' for language '${languageId}'.`,
        )
      } else {
        throw new Error(
          `The service registry contains no services for the extension '${ext}'.`,
        )
      }
    }
    return this.fileExtensionMap.get(matchedExtension)!
  }
}
