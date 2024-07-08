/* eslint-disable @typescript-eslint/no-var-requires */
const { generateTs } = require('@formml/cli')
const { runAsWorker } = require('synckit')

runAsWorker(generateTs)
