import { createFormMLParser } from '@formml/dsl'

import IndexManager, { IndexSymbol } from '../IndexManager.js'

describe('IndexManager', () => {
  const parse = createFormMLParser()

  test('should create indexes', async () => {
    // Arrange
    const schema = await parse(`
      form ExampleForm {
        num      numField
        text     textField
        bool     boolField
        datetime datetimeField
        decimal  decimalField
      }
    `)

    // Act
    const indexManager = new IndexManager(schema)

    // Assert
    expect(indexManager.root).toEqual({
      [IndexSymbol.name]: 'ExampleForm',
      [IndexSymbol.type]: 'form',
      boolField: {
        [IndexSymbol.name]: 'boolField',
        [IndexSymbol.type]: 'bool',
      },
      datetimeField: {
        [IndexSymbol.name]: 'datetimeField',
        [IndexSymbol.type]: 'datetime',
      },
      decimalField: {
        [IndexSymbol.name]: 'decimalField',
        [IndexSymbol.type]: 'decimal',
      },
      numField: {
        [IndexSymbol.name]: 'numField',
        [IndexSymbol.type]: 'num',
      },
      textField: {
        [IndexSymbol.name]: 'textField',
        [IndexSymbol.type]: 'text',
      },
    })
  })

  test('should get schema by index', async () => {
    // Arrange
    const schema = await parse(`
      form ExampleForm {
        num numField
      }
    `)

    // Act
    const indexManager = new IndexManager(schema)

    // Assert
    expect(indexManager.for(indexManager.root).get('schema')).toBe(schema.form)

    const fieldIndex = indexManager.root['numField']
    expect(indexManager.for(fieldIndex).get('schema')).toBe(
      schema.form.fields[0],
    )
  })
})
