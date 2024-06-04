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
    if (this.map === undefined) {
      throw new Error(
        'The service registry is empty. Use `register` to register the services of a language.',
      )
    }
    const fileName = UriUtils.basename(uri)
    const knownExtensionsDesc = Object.keys(this.map).sort(
      (a, b) => b.length - a.length,
    )
    const matchedExtension = knownExtensionsDesc.find((ext) =>
      fileName.endsWith(ext),
    )
    if (!matchedExtension) {
      throw new Error(
        `The service registry contains no services for the extension '${UriUtils.extname(
          uri,
        )}'.`,
      )
    }
    return this.map[matchedExtension]
  }
}
