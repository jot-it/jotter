"use client";
import { useRootDocument } from "@/app/CollaborationContext";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import { Transaction } from "yjs";
import { Item, SidebarItemListProps } from ".";
import { Action, itemsReducer } from "./state";

export const SIDEBAR_LOCAL_STORAGE_KEY = "notes";

export const SidebarItemsContext = createContext<Item[]>([]);

export const SidebarDispatchContext = createContext<React.Dispatch<Action>>(
  () => {},
);

export function useSidebarItems() {
  return useContext(SidebarItemsContext);
}

export function useSidebarDispatch() {
  return useContext(SidebarDispatchContext);
}

function SidebarContextProvider({
  children,
  items: initialItems = [],
}: PropsWithChildren<Partial<SidebarItemListProps>>) {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);
  const ydoc = useRootDocument();
  
  const origin = ydoc.clientID;

  // Sync local to yjs
  useEffect(() => {
    const ysidebar = ydoc.getArray("sidebar");
    const onSidebarChange = (_: unknown, transaction: Transaction) => {
      const isMyOwnChange = transaction.origin === origin;
      if (isMyOwnChange) {
        return;
      }
      dispatch({ type: "initialize_state", items: ysidebar.toJSON() });
    }

    ysidebar.observeDeep(onSidebarChange);

    return () => {
      ysidebar.unobserveDeep(onSidebarChange);
    }
  }, [ydoc, origin]);

  // TODO Save history of who updated the sidebar
  // Sync yjs to local
  useEffect(() => {
    const sidebar = ydoc.getArray("sidebar");
    ydoc.transact(() => {
      sidebar.delete(0, sidebar.length);
      sidebar.push(items);
    }, origin);
  }, [items, ydoc, origin]);

  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
}
export default SidebarContextProvider;
