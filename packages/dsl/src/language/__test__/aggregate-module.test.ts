import { URI } from 'langium'

import { createInMemoryAggregateServices } from '../aggregate-module.js'

describe('aggregate module', () => {
  test.each([
    ['test.formml', 'formml'],
    ['test.d.formml', 'formml-declaration'],
  ])(
    'should get correct language service according to file extension: "%s" -> "%s"',
    (fileName, expectedLanguageId) => {
      const { shared } = createInMemoryAggregateServices()
      expect(
        shared.ServiceRegistry.getServices(URI.parse(`file:///${fileName}`))
          .LanguageMetaData.languageId,
      ).toBe(expectedLanguageId)
    },
  )
})
