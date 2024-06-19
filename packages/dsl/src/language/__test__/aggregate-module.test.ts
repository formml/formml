import { URI } from 'langium'
import { parseHelper } from 'langium/test'

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

  test.each(['@required'])(
    'should support built-in annotation "%s"',
    async (annotation) => {
      const services = createInMemoryAggregateServices()
      await services.shared.workspace.WorkspaceManager.initialized({})
      const input = `
        form Example {
          ${annotation}
          text field
        }
      `
      const result = await parseHelper(services.FormML)(input, {
        validation: true,
      })
      expect(result.diagnostics).toEqual([])
    },
  )

  test.each(['Annotation<text>'])(
    'should support built-in type "%s"',
    async (type) => {
      const services = createInMemoryAggregateServices()
      await services.shared.workspace.WorkspaceManager.initialized({})
      const input = `
        type MyType = ${type}
      `
      const result = await parseHelper(services.FormMLDeclaration)(input, {
        validation: true,
      })
      expect(result.diagnostics).toEqual([])
    },
  )
})
