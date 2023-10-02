"use client";
import { useEffect } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

/** Yjs root document, all collaborative components should use this as root
 *
 * @see https://docs.yjs.dev/api/subdocuments
 */
export const rootDocument = new Y.Doc();

export function getCollabServerURL() {
  const url = process.env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_COLLAB_SERVER_URL is not set in environment variables",
    );
  }
  return url;
}

export function createProvider(document: Y.Doc, roomName: string) {
  return new WebsocketProvider(getCollabServerURL(), roomName, document);
}

/**
 * Connects root document to the collaboration server
 */
export function StartCollaboration() {
  useEffect(() => {
    const provider = createProvider(rootDocument, "root");
    return () => {
      provider.disconnect();
    };
  }, []);

  return null;
}
