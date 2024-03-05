"use client";
import { Token } from "@/actions/token";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { accessTokenAtom, useConnection, useToken } from "../collaboration";
import { createConnection, rootConnectionAtom } from "./store";

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
      connectionProvider.destroy();
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
