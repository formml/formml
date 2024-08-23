import { clearDocuments, parseHelper } from 'langium/test'

import type { FormMLDeclaration } from '../../generated/ast.js'

import { createInMemoryAggregateServices } from '../../aggregate-module.js'

describe('formml-declaration validator', () => {
  const services = createInMemoryAggregateServices()

  afterEach(async () => {
    await clearDocuments(services.shared)
  })

  const parser = (input: string) =>
    parseHelper<FormMLDeclaration>(services.FormMLDeclaration)(input, {
      validation: true,
    })

  describe('annotation', () => {
    test('invalidate required parameters after optional parameters', async () => {
      const input = 'annot fun foo(a: num, b?: text, c: bool)'
      const { diagnostics } = await parser(input)
      expect(diagnostics).toHaveLength(1)
      expect(diagnostics).toMatchSnapshot()
    })
  })
})
