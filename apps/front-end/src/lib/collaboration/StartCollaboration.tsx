"use client";
import { useLocalIdentity } from "@/lib/identity-provider";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useConnection, rootConnectionAtom } from "./store";
import { createConnection, rootDocument } from "./store";

type StartCollaborationProps = {
  notebookId: string;
};

/**
 * Connects root document to the collaboration server using the notebook ID as
 * the document name. Uses local identity for presence awareness.
 */
export function StartCollaboration({ notebookId }: StartCollaborationProps) {
  const identity = useLocalIdentity();
  const setConnection = useSetAtom(rootConnectionAtom);
  const provider = useConnection();

  useEffect(() => {
    const connectionProvider = createConnection({
      name: notebookId,
      connect: true,
      document: rootDocument,
      token: "", // No token required for local-first collaboration
    });

    setConnection(connectionProvider);
    return () => {
      connectionProvider.destroy();
    };
  }, [notebookId, setConnection]);

  // Inform all users in this notebook about your presence
  useEffect(() => {
    provider.setAwarenessField("user", {
      id: identity.id,
      name: identity.name,
    });
  }, [identity, provider]);

  return null;
}
