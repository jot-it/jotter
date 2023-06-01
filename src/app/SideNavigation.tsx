"use client";
import { useReducer } from "react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar, { ItemProps } from "../components/Sidebar";
import sidebarConfig from "../sidebarConfig";

let nextId = 9; // last id of sidebarConfig

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
    };

//TODO: REACT CONTEXT TO USE CONTEXT MENU
function SideNavigation() {
  const [items, dispatch] = useReducer(SidebarReducer, sidebarConfig);

  return (
    <Sidebar>
      {/* Add new page */}
      <Sidebar.ItemList items={items} />
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button onClick={() => dispatch({ type: "insert" })}>
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
        <Sidebar.Button onClick={() => dispatch({ type: "delete", id: 4 })}>
          DELETE
        </Sidebar.Button>
        <Sidebar.Button onClick={() => dispatch({ type: "group", id: 2 })}>
          GROUP
        </Sidebar.Button>
        <Sidebar.Button
          onClick={() =>
            dispatch({ type: "rename", newLabel: "new name", id: 5 })
          }
        >
          RENAME
        </Sidebar.Button>
      </div>
    </Sidebar>
  );
}

function SidebarReducer(items: ItemProps[], action: Action): ItemProps[] {
  switch (action.type) {
    case "rename":
      return renameItem(items, action.id, action.newLabel);
    case "delete":
      return deleteItem(items, action.id);
    case "group":
      return groupItem(items, action.id);
    case "insert":
      return insertItem(items);
  }
}

//#region REDUCER ACTIONS
function groupItem(items: ItemProps[], id: number) {
  return mapSidebar(items, (item) => {
    if (item.id == id) {
      // assign new ID
      item.id = nextId;
      // create new Category
      let newItem: ItemProps = {
        id: item.id,
        type: "category",
        label: "Group " + item.label,
        items: [item],
      };
      return newItem;
    }
    return item;
  });
}

function renameItem(items: ItemProps[], id: number, newLabel: string) {
  return mapSidebar(items, (item) => {
    if (item.id === id) {
      item.label = newLabel;
    }
    return item;
  });
}

//TODO: Insert by Id
function insertItem(items: ItemProps[]): ItemProps[] {
  return [
    ...items,
    { label: "New page", type: "link", href: "ni01", id: nextId++ },
  ];
}

function deleteItem(items: ItemProps[], id: number) {
  return filterSidebar(items, (item) => item.id !== id);
}
//#endregion

//#region FILTER AND MAP FUNCTION
function filterSidebar(
  items: ItemProps[],
  fn: (item: ItemProps) => boolean
): ItemProps[] {
  const newItems = [];
  for (const item of items) {
    if (!fn(item)) {
      continue;
    }
    if (item.type === "category") {
      item.items = filterSidebar(item.items, fn);
    }
    newItems.push(item);
  }
  return newItems;
}

function mapSidebar(
  items: ItemProps[],
  fn: (item: ItemProps) => ItemProps
): ItemProps[] {
  const newItems = [];
  for (const item of items) {
    if (item.type === "category") {
      item.items = mapSidebar(item.items, fn);
    }
    newItems.push(fn(item));
  }
  return newItems;
}
//#endregion

export default SideNavigation;
