"use client";
import { useEffect } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

export const rootDocument = new Y.Doc();

function CollaborationProvider() {
  useEffect(() => {
    const provider = new WebsocketProvider(
      getCollabServerURL(),
      "collab_root",
      rootDocument,
    );
    provider.connect();
    return () => provider.disconnect();
  }, []);

  return null;
}

function getCollabServerURL() {
  const url = process.env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_COLLAB_SERVER_URL is not set in environment variables",
    );
  }
  return url;
}

export default CollaborationProvider;
