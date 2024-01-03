import { nanoid } from "nanoid";
import { proxy } from "valtio";
import { Item } from "./Item";

// Valtio proxy state for sidebar items, all state here will be immediately
// available to all clients connected to the same Yjs document.
// For local state, use useState instead.
export const sidebarState = proxy<Item[]>([]);

/**
 * @param type Type of item to create
 * @param fromCrumbs breadcrumbs path to this item
 */
export function createItem(
  type: Item["type"],
  workspace: string,
  fromCrumbs: Item["crumbs"],
): Item {
  const id = nanoid();
  const href = `/${workspace}/note/${id}`;
  const label = "";
  const crumbs = fromCrumbs.concat([{ label, href }]);
  if (type === "category") {
    return {
      type: "category",
      id,
      label,
      href,
      crumbs,
      items: [],
      isNew: true,
    };
  }

  return { type: "link", id, label, href, crumbs, isNew: true };
}

export function insertItem(itemList: Item[], item: Item) {
  itemList.push(item);
}

export function newPage(
  items: Item[],
  workspace: string,
  crumbs: Item["crumbs"] = [],
) {
  const item = createItem("link", workspace, crumbs);
  items.push(item);
  return item;
}

export function newCategory(
  items: Item[],
  workspace: string,
  crumbs: Item["crumbs"] = [],
) {
  const item = createItem("category", workspace, crumbs);
  items.push(item);
  return item;
}

export function setIsNewItem(item: Item, value: boolean) {
  item.isNew = value;
}

export function removeItem(items: Item[], i: Item) {
  const position = items.findIndex((item) => item.id === i.id);
  items.splice(position, 1);
}

export function setLabel(item: Item, label: string) {
  item.label = label;
  item.isNew = false;

  // Last crumb is the item itself
  const crumb = item.crumbs[item.crumbs.length - 1];
  crumb.label = label;
}
