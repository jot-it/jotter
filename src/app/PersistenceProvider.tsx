"use client";
import type { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { createWebSocketProvider, getYDocument } from "./note/utils";

type DBState = ReturnType<typeof useState<IndexeddbPersistence>>;

type Context = {
  db: DBState[0];
  providerFactory: ComponentPropsWithoutRef<
    typeof CollaborationPlugin
  >["providerFactory"];
};

const PersistenceContext = createContext<Context | null>(null);

function PersistenceProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<IndexeddbPersistence>();

  const providerFactory: Context["providerFactory"] = useCallback(
    (docName, yjsDocMap) => {
      const doc = getYDocument(docName, yjsDocMap);
      const websocketProvider = createWebSocketProvider(docName, doc);
      
      const indexedDb = new IndexeddbPersistence(docName, doc);

      indexedDb.on("synced", () => {
        console.log("Document synced!");
      });

      setDb(indexedDb);
      return websocketProvider;
    },
    [],
  );

  const value = useMemo(
    () => ({
      db,
      providerFactory,
    }),
    [db, providerFactory],
  );

  return (
    <PersistenceContext.Provider value={value}>
      {children}
    </PersistenceContext.Provider>
  );
}

export function useDBContext() {
  const state = useContext(PersistenceContext);
  if (!state) {
    throw new Error(`useDbContext must be used within a PersistenceProvider`);
  }
  return state;
}

export default PersistenceProvider;
