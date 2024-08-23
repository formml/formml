import type {
  AstNode,
  LangiumDocument,
  LangiumDocumentFactory,
  WorkspaceFolder,
} from 'langium'
import type { LangiumSharedServices } from 'langium/lsp'

import { DefaultWorkspaceManager, URI } from 'langium'

import builtinAnnotations from '../../../builtins/generated/modules/annotations.js'
import builtinTypes from '../../../builtins/generated/modules/types.js'

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
    collector(
      this.documentFactory.fromString(
        builtinTypes,
        URI.parse('builtin:///types.d.formml'),
      ),
    )
  }
}
