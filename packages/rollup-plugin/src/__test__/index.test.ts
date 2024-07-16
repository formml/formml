import path from 'path'
import { RollupOutput, rollup } from 'rollup'
import { build } from 'vite'

import formml from '../index.js'

describe('rollup-plugin', () => {
  test('rollup', async () => {
    const bundle = await rollup({
      external: ['rollup-plugin-formml/deps'],
      input: path.resolve(__dirname, 'fixtures/index.js'),
      plugins: [formml()],
    })
    const result = await bundle.generate({ format: 'esm' })

    expect(result.output).toHaveLength(1)
    expect(result.output[0].code).toMatchInlineSnapshot(`
      "import deps from 'rollup-plugin-formml/deps';

      const json = "{\\"node\\":{\\"$type\\":\\"FormMLSchema\\",\\"form\\":{\\"$type\\":\\"Form\\",\\"name\\":\\"testForm\\",\\"fields\\":[{\\"$type\\":\\"Field\\",\\"type\\":\\"text\\",\\"name\\":\\"textField\\",\\"annotations\\":[]}]}}}";
      const ast = deps.parse(json);

      export { ast as default };
      "
    `)
  })

  test('vite', async () => {
    const result = (await build({
      build: {
        lib: {
          entry: path.resolve(__dirname, 'fixtures/index.js'),
          formats: ['es'],
          name: 'test',
        },
        rollupOptions: {
          external: ['rollup-plugin-formml/deps'],
        },
      },
      plugins: [formml()],
    })) as RollupOutput[]

    expect(result).toHaveLength(1)
    expect(result[0].output).toHaveLength(1)
    expect(result[0].output[0].code).toMatchInlineSnapshot(`
      "import e from "rollup-plugin-formml/deps";
      const t = '{"node":{"$type":"FormMLSchema","form":{"$type":"Form","name":"testForm","fields":[{"$type":"Field","type":"text","name":"textField","annotations":[]}]}}}', s = e.parse(t);
      export {
        s as default
      };
      "
    `)
  })
})
