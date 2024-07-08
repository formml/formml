import * as path from 'node:path'

import generateTsSync from '..'

describe('generateTsSync', () => {
  test('should generate ts code synchronously', () => {
    const filePath = './test.formml'
    const result = generateTsSync(path.resolve(__dirname, filePath))
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
})
