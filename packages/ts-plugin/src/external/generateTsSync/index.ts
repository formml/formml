import { generateTs } from '@formml/cli'
import { createSyncFn } from 'synckit'

const generateTsSync = createSyncFn<typeof generateTs>(
  require.resolve('./worker.cjs'),
)
export default generateTsSync
