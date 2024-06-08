import builtinAnnotations from '@formml/dsl/builtins/annotations.d.formml'
import * as vscode from 'vscode'

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

  readFile(_uri: vscode.Uri): Uint8Array {
    // We could return different libraries based on the URI
    // We have only one, so we always return the same
    return builtinAnnotations
  }

  rename() {
    throw vscode.FileSystemError.NoPermissions()
  }

  stat(_uri: vscode.Uri): vscode.FileStat {
    const date = Date.now()
    return {
      ctime: date,
      mtime: date,
      size: builtinAnnotations.length,
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
