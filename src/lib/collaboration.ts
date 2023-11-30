"use client";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { useEffect, useState } from "react";
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
export const rootConnectionProvider = createProvider({
  name: "root",
  connect: false,
});

/** Yjs root document, all collaborative components should use this as root
 *
 * @see https://docs.yjs.dev/api/subdocuments
 */
export const rootDocument = rootConnectionProvider.document;

export function createProvider(
  config: Omit<HocuspocusProviderConfiguration, "url">,
) {
  const url = process.env.NEXT_PUBLIC_COLLAB_SERVER_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_COLLAB_SERVER_URL is not set in environment variables",
    );
  }

  return new HocuspocusProvider({
    url,
    ...config,
  });
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
