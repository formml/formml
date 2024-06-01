import { createFormMLServices } from '@formml/dsl'
import { startLanguageServer } from 'langium/lsp'
import { NodeFileSystem } from 'langium/node'
import {
  ProposedFeatures,
  createConnection,
} from 'vscode-languageserver/node.js'

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all)

// Inject the shared services and language-specific services
const { shared } = createFormMLServices({ connection, ...NodeFileSystem })

// Start the language server with the shared services
startLanguageServer(shared)
