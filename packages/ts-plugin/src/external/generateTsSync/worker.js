import * as dsl from '@formml/dsl'
import { runAsWorker } from 'synckit'

runAsWorker(dsl.generators.generateTs)
