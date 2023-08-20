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
    }
  | {
      type: "edit_mode";
      id: Item["id"];
      value?: boolean;
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
      return items.map((item) => {
        if (item.id !== action.id) {
          return item;
        }
        const crumbs = [...item.crumbs];
        const last = crumbs.pop();
        if (last) {
          last.label = action.label;
          crumbs.push({ ...last });
        }
        return {
          ...item,
          crumbs,
          label: action.label,
          editable: false,
        };
      });

    case "delete":
      return items.filter((item) => item.id !== action.id);

    case "edit_mode":
      return items.map((item) =>
        item.id !== action.id ? item : { ...item, editable: action.value },
      );
  }
}

function createItem(type: Item["type"]): Item {
  const id = window.crypto.randomUUID();
  const href = `/note/${id}`;
  const label = "New note";
  const crumbs = [{ label, href }];
  if (type === "category") {
    return {
      type: "category",
      id,
      label,
      href,
      crumbs,
      items: [],
      editable: true,
    };
  }

  return { type: "link", id, label, href, crumbs, editable: true };
}

export function useSidebarReducer(items: Item[]) {
  return useReducer(itemsReducer, items);
}
