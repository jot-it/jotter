import { ItemProps } from "../Sidebar";
import { filterSidebar, mapSidebar } from "./utils";

export type Action =
  | {
      type: "rename";
      id: string;
      newLabel: string;
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
      newItem: ItemProps;
    }
  | {
      type: "create";
      newItem: ItemProps;
    };

export function itemsReducer(items: ItemProps[], action: Action): ItemProps[] {
  switch (action.type) {
    case "rename":
      return updateItem(items, action.id, { label: action.newLabel });
    case "delete":
      return deleteItem(items, action.id);
    case "group":
      throw new Error("Not implemented");
    case "insert":
      return insertItem(items, action.id, action.newItem);
    case "create":
      return createItem(items, action.newItem);
  }
}

//#region REDUCER ACTIONS
function updateItem(
  items: ItemProps[],
  id: string,
  newItem: Partial<ItemProps>
) {
  return mapSidebar(items, (item) => {
    if (item.id === id) return Object.assign(item, newItem);
    return item;
  });
}

function insertItem(items: ItemProps[], id: string, newItem: ItemProps) {
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

function createItem(items: ItemProps[], newItem: ItemProps) {
  items = [...items, newItem];
  return items;
}

function deleteItem(items: ItemProps[], id: string) {
  return filterSidebar(items, (item) => item.id !== id);
}
//#endregion
