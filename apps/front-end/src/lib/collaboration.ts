"use client";
import { Token } from "@/actions/token";
import env from "@/config/env-client";
import { IS_BROWSER } from "@/utils";
import {
  HocuspocusProvider,
  HocuspocusProviderConfiguration,
} from "@hocuspocus/provider";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { Doc } from "yjs";

/**
 * Collaborative state that is synced between all clients
 */
export type SharedState = {
  user: User;
};

type AwarenessState = { clientId: number } & SharedState;

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

type StartCollaborationProps = {
  user: User;
  notebookName: string;
  initialToken: Token;
  onTokenRefresh(): Promise<Token>;
};

/**
 * Connects root document to the collaboration server using the current
 * workspace as the name of the document.
 */
export function StartCollaboration({
  user,
  notebookName: name,
  initialToken,
  onTokenRefresh,
}: StartCollaborationProps) {
  useAutoRefreshingToken(initialToken, onTokenRefresh);

  const setConnection = useSetAtom(rootConnectionAtom);
  const token = useToken();

  const provider = useConnection();

  useEffect(() => {
    if (!token) {
      return;
    }
    const connectionProvider = createConnection({ name, token: token.value });
    setConnection(connectionProvider);
    return () => {
      connectionProvider.disconnect();
    };
  }, [name, token, setConnection]);

  // Inform all users in this notebook about your presence
  useEffect(() => {
    provider.setAwarenessField("user", user);
  }, [user, token, provider]);

  return null;
}

function useAutoRefreshingToken(
  initialToken: Token,
  onRefresh: () => Promise<Token>,
) {
  useHydrateAtoms([[accessTokenAtom, initialToken]]);

  const [nextRefreshTime, setNextRefreshTime] = useState(
    initialToken.expiresAt,
  );
  const setToken = useSetAtom(accessTokenAtom);

  useEffect(() => {
    const now = new Date().getTime();
    const remainingTime = nextRefreshTime - now;
    const timeout = setTimeout(async () => {
      const newToken = await onRefresh();
      setToken(newToken);
      setNextRefreshTime(newToken.expiresAt);
    }, remainingTime);

    return () => {
      clearTimeout(timeout);
    };

    // Keep looping to renew the token every time it expires
  }, [nextRefreshTime, setToken, onRefresh]);
}

export function useAwareness() {
  const provider = useConnection();
  //TODO this can be optimized so that there is only 1 global awareness state
  const [awareness, setAwareness] = useState<AwarenessState[]>([]);
  useEffect(() => {
    const onAwarenessChange = ({ states }: { states: AwarenessState[] }) => {
      console.log(states);
      setAwareness(states);
    };
    provider.on("awarenessUpdate", onAwarenessChange);
    return () => {
      provider.off("awarenessUpdate", onAwarenessChange);
    };
  }, [provider]);
  return awareness;
}

export function useSelf() {
  const { data } = useSession();
  return data?.user;
}

export function useOthers() {
  const me = useSelf();
  const sharedState = useAwareness();

  console.log(sharedState);

  return sharedState.filter((state) => state.user.id != me?.id);
}
