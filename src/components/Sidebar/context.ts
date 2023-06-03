import { createContext, useContext } from "react";
import { Action } from "./state";
import { ItemProps } from ".";

export const SidebarItemsContext = createContext<ItemProps[]>([]);

export const SidebarDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export function useSidebarItems() {
  return useContext(SidebarItemsContext);
}

export function useSidebarDispatch() {
  return useContext(SidebarDispatchContext);
}
