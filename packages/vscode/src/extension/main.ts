import type * as vscode from 'vscode'

import * as path from 'path'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node.js'

import { BuiltinsFileSystemProvider } from './BuiltinsFileSystemProvider.js'

let client: LanguageClient

// This function is called when the extension is activated.
export function activate(context: vscode.ExtensionContext): void {
  BuiltinsFileSystemProvider.register(context)
  client = startLanguageClient(context)
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
  if (client) {
    return client.stop()
  }
  return undefined
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
  const serverModule = context.asAbsolutePath(
    path.join('dist', 'language', 'main.cjs'),
  )
  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging.
  // By setting `process.env.DEBUG_BREAK` to a truthy value, the language server will wait until a debugger is attached.
  const debugOptions = {
    execArgv: [
      '--nolazy',
      `--inspect${process.env['DEBUG_BREAK'] ? '-brk' : ''}=${
        process.env['DEBUG_SOCKET'] || '6009'
      }`,
    ],
  }

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    debug: {
      module: serverModule,
      options: debugOptions,
      transport: TransportKind.ipc,
    },
    run: { module: serverModule, transport: TransportKind.ipc },
  }

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { language: 'formml', scheme: 'file' },
      { language: 'formml-declaration', scheme: 'file' },
    ],
  }

  // Create the language client and start the client.
  const client = new LanguageClient(
    'formml',
    'FormML',
    serverOptions,
    clientOptions,
  )

  // Start the client. This will also launch the server
  void client.start()
  return client
}
