import * as v from 'valibot'

import { allowBlank } from '../allowBlank.js'

describe('allowBlank', () => {
  test.each(['', '  ', ' \n\t'])(
    'should bypass inner validation if input is blank - %j',
    (input) => {
      const schema = v.pipe(v.string(), allowBlank(v.email()))
      const result = v.safeParse(schema, input)
      expect(result.success).toBe(true)
    },
  )
})
