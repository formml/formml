import type { initGenerateDts } from '@formml/dsl/generators/generateDts.js'

import { createSyncFn } from 'synckit'

const generateDtsSync = createSyncFn<ReturnType<typeof initGenerateDts>>(
  require.resolve('./worker.js'),
)
export default generateDtsSync
