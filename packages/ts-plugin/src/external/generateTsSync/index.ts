import { generators } from '@formml/dsl'
import { createSyncFn } from 'synckit'

const generateTsSync = createSyncFn<typeof generators.generateTs>(
  require.resolve('./worker.js'),
)
export default generateTsSync
