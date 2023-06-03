import { ItemProps } from "../Sidebar";
import { filterSidebar, mapSidebar } from "./utils";

let nextId = 10; // last id of sidebarConfig
export type Action =
  | {
      type: "rename";
      id: number;
      newLabel: string;
    }
  | {
      type: "delete";
      id: number;
    }
  | {
      type: "group";
      id: number;
    }
  | {
      type: "insert";
      id: number;
      itemType: ItemProps["type"];
    }
  | {
      type: "create";
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
      return insertItem(items, action.id, action.itemType);
    case "create":
      return createItem(items);
  }
}

//#region REDUCER ACTIONS
function updateItem(
  items: ItemProps[],
  id: number,
  newItem: Partial<ItemProps>
) {
  return mapSidebar(items, (item) => {
    if (item.id === id) return Object.assign(item, newItem);
    return item;
  });
}

function insertItem(
  items: ItemProps[],
  id: number,
  itemType: ItemProps["type"]
) {
  let newItem: ItemProps = {
    label: "New page",
    type: "link",
    id: getNewId(),
    href: "#ni000",
  };

  if (itemType === "category") {
    newItem = {
      label: "New Category",
      type: "category",
      id: getNewId(),
      items: [],
    };
  }

  return mapSidebar(items, (item) => {
    if (item.id !== id) {
      return item;
    }
    if (item.type === "category") {
      return {
        ...item,
        items: [...item.items, newItem],
        id: getNewId(),
      };
    }

    return item;
  });
}

function createItem(items: ItemProps[]) {
  let newItem: ItemProps = {
    label: "New item",
    type: "link",
    href: "#000",
    id: getNewId(),
  };

  items = [...items, newItem];
  return items;
}

function deleteItem(items: ItemProps[], id: number) {
  return filterSidebar(items, (item) => item.id !== id);
}
//#endregion

function getNewId() {
  return nextId++;
}
