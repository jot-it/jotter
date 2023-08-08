import { useReducer } from "react";
import { Item } from "../Sidebar";

export type Action =
  | {
      type: "add_item";
      itemType: Item["type"];
    }
  | {
      type: "rename";
      id: Item["id"];
      label: Item["label"];
    }
  | {
      type: "delete";
      id: Item["id"];
    };

function itemsReducer(items: Item[], action: Action): Item[] {
  switch (action.type) {
    case "add_item": {
      return [...items, createItem(action.itemType)];
    }
    case "rename":
      if (action.label.length === 0) {
        return items.filter((item) => item.id !== action.id);
      }
      return items.map((item) =>
        item.id !== action.id ? item : { ...item, label: action.label },
      );
    case "delete":
      return items.filter((item) => item.id !== action.id);
  }
}

function createItem(type: Item["type"]): Item {
  const id = window.crypto.randomUUID();
  const href = `/note/${id}`;
  const label = "New note";
  if (type === "category") {
    return { type: "category", id, label, href, items: [] };
  }

  return { type: "link", id, label, href };
}

export function useSidebarReducer(items: Item[]) {
  return useReducer(itemsReducer, items);
}
