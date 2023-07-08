"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
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
  const [hasInitialized, setHasinitialized] = useState(false);

  useEffect(() => {
    // Using the initializer function from useReducer is not an option here
    // because we need to read from localStorage and returning something different
    // on the server and client will cause hydration errors.
    const notes = window.localStorage.getItem(SIDEBAR_LOCAL_STORAGE_KEY);
    if (!notes) {
      return;
    }
    dispatch({ type: "initialize_state", items: JSON.parse(notes) });
    setHasinitialized(true);
  }, []);

  useEffect(() => {
    // Ensure we first set the initial items from localStorage
    if (!hasInitialized) {
      return;
    }

    window.localStorage.setItem(
      SIDEBAR_LOCAL_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [items, hasInitialized]);

  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
}
export default SidebarContextProvider;
