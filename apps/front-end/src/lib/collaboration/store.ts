import env from "@/config/env-client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { atom, useAtomValue } from "jotai";
import { IndexeddbPersistence } from "y-indexeddb";
import { Doc } from "yjs";

/**
 * Collaborative state that is synced between all clients
 */
export type SharedState = {
  user: {
    id: string;
    name: string;
  };
};

export type AwarenessState = { clientId: number } & SharedState;

/**
 * The main Yjs document for the entire application. Shared state should be
 * part of this document whenever possible.
 */
export const rootDocument = new Doc();

/**
 * The root connection represents the actual websocket connection to the
 * collaboration servers.
 */
function createDefaultConnection() {
  if (typeof window === "undefined") {
    // During server-side rendering, create a minimal stub
    return {
      destroy: () => {},
      setAwarenessField: () => {},
      on: () => {},
      off: () => {},
      isSynced: false,
    } as any;
  }

  return createConnection({
    name: "default",
    connect: false,
    token: "",
    document: rootDocument,
  });
}

export const rootConnectionAtom = atom(createDefaultConnection());

export function useConnection() {
  return useAtomValue(rootConnectionAtom);
}

export type ConnectionConfiguration = Omit<
  HocuspocusProviderConfiguration,
  "url"
> & {
  token?: string;
};

/**
 * Create a connection provider that connects to the collaboration server.
 * For local-first collaboration with IndexedDB persistence, token is optional.
 */
export function createConnection(config: ConnectionConfiguration) {
  const url = env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  const provider = new HocuspocusProvider({
    ...config,
    url,
  });
  createIDBPersistence(config.name, provider.document);

  return provider;
}

function createIDBPersistence(documentName: string, doc: Doc) {
  if (IS_BROWSER) {
    new IndexeddbPersistence(documentName, doc);
  }
}
