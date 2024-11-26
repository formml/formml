/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Field } from '@formml/dsl'

import { buildValibotSchema } from '@formml/core'

import { createInputValidator } from '../validator.js'

vi.mock('@formml/core')

describe('validator', () => {
  test('should give preprocessors', () => {
    // Arrange
    const field = {
      name: 'test',
      type: 'text',
    } as Field

    // Act
    createInputValidator(field)

    // Assert
    const expectedSchemaShape = expect.objectContaining({
      async: false,
      kind: 'schema',
      pipe: [
        expect.anything(),
        expect.objectContaining({
          kind: 'transformation',
          type: 'transform',
        }),
      ],
      type: 'string',
    })
    const expectedPreprocess = {
      bool: expectedSchemaShape,
      datetime: expectedSchemaShape,
      decimal: expectedSchemaShape,
      num: expectedSchemaShape,
      text: expectedSchemaShape,
    }
    expect(buildValibotSchema).toBeCalledWith(field, expectedPreprocess)
  })
})
