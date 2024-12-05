import type { LangiumSharedServices } from 'langium/lsp'

import { URI } from 'langium'

import builtinAnnotations from '../../../../builtins/annotations.d.fml?raw'
import builtinTypes from '../../../../builtins/types.d.fml?raw'
import BuiltinsWorkspaceManager from '../BuiltinsWorkspaceManager.js'

describe('BuiltinsWorkspaceManager', () => {
  test('should load built-in annotations when starting up', async () => {
    // Arrange
    const dummyDocument = {}
    const mockedServices = {
      ServiceRegistry: {
        all: [],
      },
      workspace: {
        DocumentBuilder: {
          build: vi.fn(),
        },
        LangiumDocumentFactory: {
          fromString: vi.fn().mockReturnValue(dummyDocument),
        },
        LangiumDocuments: {
          addDocument: vi.fn(),
          hasDocument: vi.fn().mockReturnValue(false),
        },
      },
    } as unknown as LangiumSharedServices
    const workspaceManager = new BuiltinsWorkspaceManager(mockedServices)

    // Act
    await workspaceManager.initializeWorkspace([])

    // Assert
    expect(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      mockedServices.workspace.LangiumDocumentFactory.fromString,
    ).toHaveBeenCalledWith(
      builtinAnnotations,
      URI.parse('builtin:///annotations.d.fml'),
    )
    expect(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      mockedServices.workspace.LangiumDocuments.addDocument,
    ).toHaveBeenCalledWith(dummyDocument)
  })

  test('should load built-in types when starting up', async () => {
    // Arrange
    const dummyDocument = {}
    const mockedServices = {
      ServiceRegistry: {
        all: [],
      },
      workspace: {
        DocumentBuilder: {
          build: vi.fn(),
        },
        LangiumDocumentFactory: {
          fromString: vi.fn().mockReturnValue(dummyDocument),
        },
        LangiumDocuments: {
          addDocument: vi.fn(),
          hasDocument: vi.fn().mockReturnValue(false),
        },
      },
    } as unknown as LangiumSharedServices
    const workspaceManager = new BuiltinsWorkspaceManager(mockedServices)

    // Act
    await workspaceManager.initializeWorkspace([])

    // Assert
    expect(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      mockedServices.workspace.LangiumDocumentFactory.fromString,
    ).toHaveBeenCalledWith(builtinTypes, URI.parse('builtin:///types.d.fml'))
    expect(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      mockedServices.workspace.LangiumDocuments.addDocument,
    ).toHaveBeenCalledWith(dummyDocument)
  })
})
