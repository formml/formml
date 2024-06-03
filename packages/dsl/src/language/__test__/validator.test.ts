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
      expect(diagnostics).toMatchSnapshot()
    })

    test('should error when named arguments appear before positional arguments - multiple appearances', async () => {
      const input = `
        form ExampleForm {
          @any(1, name1: "value1", 2, name2: "value2", name3: "value3", 3, name4: "value4")
          num numberField
        }
      `
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(3)
      expect(diagnostics).toMatchSnapshot()
    })
  })
})
