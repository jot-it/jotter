import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Action, itemsReducer } from "./state";
import { Item, SidebarItemListProps } from ".";

export const SidebarItemsContext = createContext<Item[]>([]);

export const SidebarDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export function useSidebarItems() {
  return useContext(SidebarItemsContext);
}

export function useSidebarDispatch() {
  return useContext(SidebarDispatchContext);
}

function SidebarContextProvider({
  children,
  items: initialItems,
}: PropsWithChildren<SidebarItemListProps>) {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);

  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
}

export default SidebarContextProvider;
