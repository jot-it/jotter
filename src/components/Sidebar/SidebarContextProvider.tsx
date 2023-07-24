"use client";
import { useRootDocument } from "@/app/CollaborationContext";
import {
  PropsWithChildren,
  createContext,
  useCallback,
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
        console.log("Ignoring change because it was my own change");
        return;
      }
      console.log("Updating because", transaction.origin, "changed the sidebar my origin is", origin);

      dispatch({ type: "initialize_state", items: ysidebar.toJSON() });
    }

    ysidebar.observeDeep(onSidebarChange);

    return () => {
      ysidebar.unobserveDeep(onSidebarChange);
    }
  }, [ydoc, origin]);

  useEffect(() => {
    console.log("items Changed");
  }, [items]);

  const dispatchWithSync: typeof dispatch = useCallback((action) => {
    dispatch(action);
    const nextState = itemsReducer(items, action);
    const sidebar = ydoc.getArray("sidebar");
    ydoc.transact(() => {
      sidebar.delete(0, sidebar.length);
      sidebar.push(nextState);
    }, origin);

  }, [dispatch, items, origin, ydoc]);

  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatchWithSync}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
}
export default SidebarContextProvider;
