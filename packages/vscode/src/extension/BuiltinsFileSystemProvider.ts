import builtinAnnotations from '@formml/dsl/builtins/annotations.d.formml'
import builtinTypes from '@formml/dsl/builtins/types.d.formml'
import * as vscode from 'vscode'

const builtinFiles: Record<string, Uint8Array> = {
  '/annotations.d.formml': builtinAnnotations,
  '/types.d.formml': builtinTypes,
}

export class BuiltinsFileSystemProvider implements vscode.FileSystemProvider {
  private readonly didChangeFile = new vscode.EventEmitter<
    vscode.FileChangeEvent[]
  >()

  onDidChangeFile = this.didChangeFile.event

  static register(context: vscode.ExtensionContext) {
    context.subscriptions.push(
      vscode.workspace.registerFileSystemProvider(
        'builtin',
        new BuiltinsFileSystemProvider(),
        {
          isCaseSensitive: false,
          isReadonly: true,
        },
      ),
    )
  }

  createDirectory() {
    throw vscode.FileSystemError.NoPermissions()
  }

  delete() {
    throw vscode.FileSystemError.NoPermissions()
  }

  readDirectory(): [] {
    throw vscode.FileSystemError.NoPermissions()
  }

  readFile(uri: vscode.Uri): Uint8Array {
    return builtinFiles[uri.path]
  }

  rename() {
    throw vscode.FileSystemError.NoPermissions()
  }

  stat(uri: vscode.Uri): vscode.FileStat {
    const date = Date.now()
    return {
      ctime: date,
      mtime: date,
      size: builtinFiles[uri.path].length,
      type: vscode.FileType.File,
    }
  }

  watch() {
    return {
      dispose: () => {},
    }
  }

  writeFile() {
    throw vscode.FileSystemError.NoPermissions()
  }
}
