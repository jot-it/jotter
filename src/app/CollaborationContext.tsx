"use client";
import { atom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";


export const documentAtom = atom<Y.Doc>(new Y.Doc());

function CollaborationProvider() {
  const rootDocument = useAtomValue(documentAtom);
  useEffect(() => {
    const provider = new WebsocketProvider(getCollabServerURL(), "collab_root", rootDocument);
    provider.connect();
    return () => provider.disconnect();
  }, [rootDocument]);

  return null;
}

export function useRootDocument() {
  return useAtomValue(documentAtom);
}

function getCollabServerURL() {
  const url = process.env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_COLLAB_SERVER_URL is not set in environment variables");
  }
  return url;
}

export default CollaborationProvider;
