"use client";
import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { User } from "./userStore";
import { IndexeddbPersistence } from "y-indexeddb";

/**
 * Collaborative state that is synced between all clients
 */
type SharedState = {
  user: User;
};

/**
 * @see https://docs.yjs.dev/api/about-awareness
 */
type Awareness = Map<number, SharedState>;

/** Yjs root document, all collaborative components should use this as root
 *
 * @see https://docs.yjs.dev/api/subdocuments
 */
export const rootDocument = new Y.Doc();

export const rootConnectionProvider = createConnectionProvider(
  rootDocument,
  "root",
  {
    connect: false,
  },
);

/**
 * Persist all changes to IndexedDB
 *
 * @see https://docs.yjs.dev/ecosystem/database-provider/y-indexeddb
 */
const persistenceProvider = new IndexeddbPersistence("root", rootDocument);

export function createConnectionProvider(
  document: Y.Doc,
  roomName: string,
  opts: ConstructorParameters<typeof WebsocketProvider>[3],
) {
  const url = process.env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_COLLAB_SERVER_URL is not set in environment variables",
    );
  }
  return new WebsocketProvider(url, roomName, document, opts);
}

/**
 * Connects root document to the collaboration server
 */
export function StartCollaboration() {
  useEffect(() => {
    rootConnectionProvider.connect();
    return () => rootConnectionProvider.disconnect();
  }, []);

  return null;
}

function getAwarenessSnapshot() {
  return rootConnectionProvider.awareness.getStates() as Awareness;
}

function subscribeToAwareness(callback: () => void) {
  rootConnectionProvider.awareness.on("change", callback);
  return () => rootConnectionProvider.awareness.off("change", callback);
}

export function useAwareness() {
  const [awareness, setAwareness] = useState(getAwarenessSnapshot);
  useEffect(() => {
    return subscribeToAwareness(() => {
      setAwareness(new Map(getAwarenessSnapshot()));
    });
  }, []);
  return awareness;
}
