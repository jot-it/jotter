import { Token } from "@/actions/token";
import env from "@/config/env-client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { atom, useAtomValue } from "jotai";
import { User } from "next-auth";
import { IndexeddbPersistence } from "y-indexeddb";
import { Doc } from "yjs";

/**
 * Collaborative state that is synced between all clients
 */
export type SharedState = {
  user: User;
};

export type AwarenessState = { clientId: number } & SharedState;

/**
 * The root connection represents the actual websocket connection to the collaborative servers.
 */
export const rootConnectionAtom = atom(
  createConnection({ name: "default", connect: false, token: "" }),
);

/**
 * The main Yjs document for the entire application. Shared state should be part of this
 * document whenever possible.
 */
const rootDocumentAtom = atom((get) => {
  return get(rootConnectionAtom).document;
});

export const accessTokenAtom = atom<Token | null>(null);

export function useConnection() {
  return useAtomValue(rootConnectionAtom);
}

export function useRootDocument() {
  return useAtomValue(rootDocumentAtom);
}

export function useToken() {
  return useAtomValue(accessTokenAtom);
}

export type ConnectionConfiguration = Omit<
  HocuspocusProviderConfiguration,
  "url"
> &
  Required<Pick<HocuspocusProviderConfiguration, "token">>;
/**
 * Create a connection provider that connects to the collaboration server.
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
