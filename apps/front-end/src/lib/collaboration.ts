"use client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { atom } from "jotai";
import { useEffect, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { User } from "./userStore";
import { Doc } from "yjs";
import { getCollabServerURL } from "./env";

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

/**
 *  Root connection provider for all collaborative state
 */
export const rootConnectionProvider = createProvider({
  name: "root",
  connect: false,
});

/** Yjs root document, all collaborative components should use this as root
 *
 * @see https://docs.yjs.dev/api/subdocuments
 */
export const rootDocument = rootConnectionProvider.document;

/**
 * Create a connection provider that connects to the collaboration server.
 */
export function createProvider(
  config: Omit<HocuspocusProviderConfiguration, "url">,
) {
  const url = getCollabServerURL();
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

//FIXME: this should be removed
export const isCollabAtom = atom(false);

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
  return rootConnectionProvider.awareness?.getStates() as Awareness;
}

function subscribeToAwareness(callback: () => void) {
  rootConnectionProvider.awareness?.on("change", callback);
  return () => rootConnectionProvider.awareness?.off("change", callback);
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
