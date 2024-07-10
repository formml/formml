/* eslint-disable @typescript-eslint/no-var-requires */
const {
  generators: { generateTs },
} = require('@formml/dsl')
const { runAsWorker } = require('synckit')

runAsWorker(generateTs)
