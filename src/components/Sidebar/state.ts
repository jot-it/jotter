import { Item } from "./Item";
import { bind } from "valtio-yjs";
import { proxy } from "valtio";
import { nanoid } from "nanoid";
import { rootDocument } from "@/lib/collaboration";

// Valtio proxy state for sidebar items, all state here will be immediately
// available to all clients connected to the same Yjs document.
// For local state, use useState instead.
export const sidebarState = proxy<Item[]>([]);

// Synchorize Yjs shared-types with valtio proxy state
bind(sidebarState, rootDocument.getArray("sidebar"));

/**
 * @param type Type of item to create
 * @param fromCrumbs breadcrumbs path to this item
 */
function createItem(type: Item["type"], fromCrumbs: Item["crumbs"]): Item {
  const id = nanoid();
  const href = `/note/${id}`;
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

export function newPage(items: Item[], crumbs: Item["crumbs"] = []) {
  const item = createItem("link", crumbs);
  items.push(item);
  return item;
}

export function newCategory(items: Item[], crumbs: Item["crumbs"] = []) {
  const item = createItem("category", crumbs);
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
