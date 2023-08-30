import { rootDocument } from "@/app/CollaborationContext";
import { Item } from "../Sidebar";
import { bind } from "valtio-yjs";
import { proxy } from "valtio";

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
  const id = window.crypto.randomUUID();
  const href = `/note/${id}`;
  const label = "New note";
  const crumbs = fromCrumbs.concat([{ label, href }]);
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

export function newPage(items: Item[], crumbs: Item["crumbs"] = []) {
  items.push(createItem("link", crumbs));
}

export function newCategory(items: Item[], crumbs: Item["crumbs"] = []) {
  items.push(createItem("category", crumbs));
}

export function setEditMode(item: Item, value: boolean) {
  item.editable = value;
}

export function removeItem(items: Item[], i: Item) {
  const position = items.findIndex((item) => item.id === i.id);
  items.splice(position, 1);
}

export function setLabel(item: Item, label: string) {
  item.label = label;
  item.editable = false;

  // Last crumb is the item itself
  const crumb = item.crumbs[item.crumbs.length - 1];
  crumb.label = label;
}
