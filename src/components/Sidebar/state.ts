import { Item, ItemProps } from "../Sidebar";
import { filterSidebar, mapSidebar } from "./utils";

export type Action =
  | {
      type: "rename";
      id: string;
      isEditing: boolean;
      newLabel?: string;
    }
  | {
      type: "delete";
      id: string;
    }
  | {
      type: "group";
      id: string;
    }
  | {
      type: "insert";
      id: string;
      newItem: DistributiveOmit<ItemProps, "id" | "isEditing" | "href">;
    }
  | {
      type: "create";
      newItem: DistributiveOmit<ItemProps, "id" | "isEditing" | "href">;
    };

export function itemsReducer(items: Item[], action: Action): Item[] {
  switch (action.type) {
    case "rename":
      return updateItem(items, action.id, {
        isEditing: action.isEditing,
      });
    case "delete":
      return deleteItem(items, action.id);
    case "group":
      throw new Error("Not implemented");
    case "insert": {
      const id = window.crypto.randomUUID();
      const href = `/note/${id}`;
      return insertItem(items, action.id, {
        ...action.newItem,
        href,
        id,
        isEditing: true,
      });
    }
    case "create": {
      const id = window.crypto.randomUUID();
      const href = `/note/${id}`;
      return createItem(items, {
        ...action.newItem,
        isEditing: true,
        id,
        href,
      });
    }
  }
}

//#region REDUCER ACTIONS
function updateItem(items: Item[], id: string, newItem: Partial<ItemProps>) {
  return mapSidebar(items, (item) => {
    if (item.id === id) return Object.assign(item, newItem);
    return item;
  });
}

function insertItem(items: Item[], id: string, newItem: ItemProps) {
  return mapSidebar(items, (item) => {
    if (item.id !== id) {
      return item;
    }

    if (item.type === "category") {
      return {
        ...item,
        items: [...item.items, newItem],
      };
    }

    return item;
  });
}

function createItem(items: Item[], newItem: ItemProps) {
  items = [...items, newItem];
  return items;
}

function deleteItem(items: Item[], id: string) {
  return filterSidebar(items, (item) => item.id !== id);
}
//#endregion
