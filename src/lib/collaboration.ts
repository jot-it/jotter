"use client";
import { useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { User } from "./userStore";

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

export const rootProvider = createProvider(rootDocument, "root", {
  connect: false,
});

export function createProvider(
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
    rootProvider.connect();
    return () => rootProvider.disconnect();
  }, []);

  return null;
}

function getAwarenessSnapshot() {
  return rootProvider.awareness.getStates() as Awareness;
}

function subscribeToAwareness(callback: () => void) {
  rootProvider.awareness.on("change", callback);
  return () => rootProvider.awareness.off("change", callback);
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
