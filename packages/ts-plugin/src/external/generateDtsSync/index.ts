import type { generators } from '@formml/dsl'

import { createSyncFn } from 'synckit'

const generateDtsSync = createSyncFn<typeof generators.generateDts>(
  require.resolve('./worker.js'),
)
export default generateDtsSync
