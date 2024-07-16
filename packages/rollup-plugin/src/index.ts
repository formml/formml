import { generateJsFromContent } from '@formml/dsl/generators/generateJs.js'
import { Plugin } from 'rollup'

export default function formml(): Plugin {
  return {
    name: 'formml',

    async transform(formml, id) {
      if (id.slice(-7) !== '.formml') return null

      try {
        return {
          code: await generateJsFromContent(
            formml,
            'rollup-plugin-formml/deps',
          ),
          map: { mappings: '' },
          moduleSideEffects: false,
        }
      } catch (err) {
        const message = 'Could not parse FormML file'
        this.error({ cause: err, id, message })
        return null
      }
    },
  }
}
