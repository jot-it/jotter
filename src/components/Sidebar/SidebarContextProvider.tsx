// "use client";
// import { documentAtom, useRootDocument } from "@/app/CollaborationContext";
// import { atom, useAtomValue, useSetAtom } from "jotai";
// import { atomWithReducer } from "jotai/utils";
// import { useEffect } from "react";
// import { Transaction } from "yjs";
// import { Action } from "./state";

// const SIDEBAR_KEY = "sidebar";

// export const itemReducerAtom = atomWithReducer([], itemsReducer);

// const dispatchWithSyncAtom = atom(null, (get, set, action: Action) => {
//   const ydoc = get(documentAtom);
//   const sidebar = ydoc.getArray(SIDEBAR_KEY);
//   const origin = ydoc.clientID;
//   const prevItems = get(itemReducerAtom);
//   const nextItems = itemsReducer(prevItems, action);

//   set(itemReducerAtom, {
//     type: "set_items",
//     items: nextItems,
//   });

//   ydoc.transact(() => {
//     sidebar.delete(0, sidebar.length);
//     sidebar.push(nextItems);
//   }, origin);
// });

// export function useSidebarItems() {
//   return useAtomValue(itemReducerAtom);
// }

// export function useSidebarDispatch() {
//   return useSetAtom(dispatchWithSyncAtom);
// }

// function SidebarContextProvider() {
//   const dispatch = useSetAtom(itemReducerAtom);
//   const ydoc = useRootDocument();
//   const origin = ydoc.clientID;

//   useEffect(() => {
//     const ysidebar = ydoc.getArray(SIDEBAR_KEY);
//     const onSidebarChange = (_: unknown, transaction: Transaction) => {
//       const isMyOwnChange = transaction.origin === origin;
//       if (isMyOwnChange) {
//         return;
//       }
//       dispatch({ type: "set_items", items: ysidebar.toJSON() });
//     };

//     ysidebar.observeDeep(onSidebarChange);
//     return () => ysidebar.unobserveDeep(onSidebarChange);
//   }, [ydoc, origin, dispatch]);

//   return null;
// }

// export default SidebarContextProvider;
