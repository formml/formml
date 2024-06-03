import { clearDocuments, parseHelper } from 'langium/test'

import { createInMemoryServices } from '../formml-module.js'
import { FormMLSchema } from '../index.js'

describe('validator', () => {
  const services = createInMemoryServices()

  afterEach(async () => {
    await clearDocuments(services.FormML)
  })

  const parser = (input: string) =>
    parseHelper<FormMLSchema>(services.FormML)(input, { validation: true })

  describe('annotation', () => {
    test('should error when named arguments appear before positional arguments', async () => {
      const input = `
        form ExampleForm {
          @range(min: 0, 100)
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics?.[0]).toMatchInlineSnapshot(`
        {
          "code": undefined,
          "codeDescription": undefined,
          "data": undefined,
          "message": "Named argument can only appear after all positional arguments.",
          "range": {
            "end": {
              "character": 23,
              "line": 2,
            },
            "start": {
              "character": 17,
              "line": 2,
            },
          },
          "relatedInformation": undefined,
          "severity": 1,
          "source": "formml",
          "tags": undefined,
        }
      `)
    })
  })
})
