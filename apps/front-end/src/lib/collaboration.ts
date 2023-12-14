"use client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { Doc } from "yjs";
import { getCollabServerURL } from "./env";
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

/**
 *  Root connection provider for all collaborative state
 */
let rootConnectionProvider: HocuspocusProvider | null = null;

export function getRootConnectionProvider() {
  // if (!rootConnectionProvider) {
  //   throw new Error("rootConnectionProvider is undefined");
  // }

  if (rootConnectionProvider) {
    return rootConnectionProvider;
  }
}

function setRootConnectionProvider(p: HocuspocusProvider) {
  rootConnectionProvider = p;
}

/** Yjs root document, all collaborative components should use this as root
 *
 * @see https://docs.yjs.dev/api/subdocuments
 */
export const rootDocument: Doc | null = null;

export function getRootDocument() {
  return getRootConnectionProvider()?.document;
}

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

/**
 * Connects root document to the collaboration server
 */
export function StartCollaboration() {
  useEffect(() => {
    //get workspaceId from localStorage

    // first get from URL
    // else localStorage
    // else then create new workspaceId
    const workspaceId = window.localStorage.getItem("workspaceId") ?? nanoid();
    window.localStorage.setItem("workspaceId", workspaceId);

    const provider = createProvider({ name: workspaceId });
    setRootConnectionProvider(provider);
    return () => provider.disconnect();
  }, []);

  return null;
}

function getAwarenessSnapshot() {
  return getRootConnectionProvider()?.awareness?.getStates() as
    | Awareness
    | undefined;
}

function subscribeToAwareness(callback: () => void) {
  getRootConnectionProvider()?.awareness?.on("change", callback);
  return () => getRootConnectionProvider()?.awareness?.off("change", callback);
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
