"use client";
import env from "@/config/env-client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { Doc } from "yjs";

/**
 * Collaborative state that is synced between all clients
 */
export type SharedState = {
  user: User;
};

/**
 * @see https://docs.yjs.dev/api/about-awareness
 */
type Awareness = Map<number, SharedState>;

/**
 * The root connection represents the actual websocket connection to the collaborative servers.
 */
const rootConnectionAtom = atom(
  createConnection({ name: "default", connect: false, token: "" }),
);

/**
 * The main Yjs document for the entire application. Shared state should be part of this
 * document whenever possible.
 */
const rootDocumentAtom = atom((get) => {
  return get(rootConnectionAtom).document;
});

export function useConnection() {
  return useAtomValue(rootConnectionAtom);
}

export function useRootDocument() {
  return useAtomValue(rootDocumentAtom);
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

type StartCollaborationProps = {
  user: User;
  notebookName: string;
} & Omit<ConnectionConfiguration, "name">;

/**
 * Connects root document to the collaboration server using the current
 * workspace as the name of the document.
 */
export function StartCollaboration({
  user,
  notebookName,
  ...config
}: StartCollaborationProps) {
  const setConnection = useSetAtom(rootConnectionAtom);
  const { awareness } = useConnection();

  useEffect(() => {
    const connectionProvider = createConnection({
      name: notebookName,
      ...config,
    });
    setConnection(connectionProvider);
    return () => {
      connectionProvider.disconnect();
    };
  }, [notebookName, setConnection]);

  // Inform all users in this notebook about your presence
  useEffect(() => {
    awareness?.setLocalStateField("user", user);
  }, [user, awareness]);

  return null;
}

export function useAwareness() {
  const provider = useAtomValue(rootConnectionAtom);
  //TODO this can be optimized so that there is only 1 global awareness state
  const [awareness, setAwareness] = useState<Awareness>();
  useEffect(() => {
    const onAwarenessChange = () => {
      const newValue = new Map(provider.awareness?.getStates());
      setAwareness(newValue as Awareness);
    };
    provider.awareness?.on("change", onAwarenessChange);
    return () => {
      provider.awareness?.off("change", onAwarenessChange);
    };
  }, [provider]);
  return awareness;
}
