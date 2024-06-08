import {
  AstNode,
  DefaultWorkspaceManager,
  LangiumDocument,
  LangiumDocumentFactory,
  URI,
  WorkspaceFolder,
} from 'langium'
import { LangiumSharedServices } from 'langium/lsp'

import builtinAnnotations from '../../../builtins/annotations.d.formml?raw'

export default class BuiltinsWorkspaceManager extends DefaultWorkspaceManager {
  private documentFactory: LangiumDocumentFactory

  constructor(services: LangiumSharedServices) {
    super(services)
    this.documentFactory = services.workspace.LangiumDocumentFactory
  }

  protected override async loadAdditionalDocuments(
    folders: WorkspaceFolder[],
    collector: (document: LangiumDocument<AstNode>) => void,
  ): Promise<void> {
    await super.loadAdditionalDocuments(folders, collector)
    // Load our library using the `builtin` URI schema
    collector(
      this.documentFactory.fromString(
        builtinAnnotations,
        URI.parse('builtin:///annotations.d.formml'),
      ),
    )
  }
}
