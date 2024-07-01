import type tsModule from 'typescript/lib/tsserverlibrary'

export default function createProxy(
  host: tsModule.LanguageServiceHost,
  overrides: Partial<tsModule.LanguageServiceHost>,
) {
  return new Proxy(host, {
    get(target, key: keyof tsModule.LanguageServiceHost) {
      return overrides[key] ? overrides[key] : target[key]
    },
  })
}
