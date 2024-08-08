import * as dsl from '@formml/dsl'
import { initGenerateDts } from '@formml/dsl/generators/generateDts.js'
import { NodeFileSystem } from 'langium/node'
import { runAsWorker } from 'synckit'

runAsWorker(initGenerateDts(dsl.createAggregateServices(NodeFileSystem)))
