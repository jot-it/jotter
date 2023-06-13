import { Item } from "../Sidebar";

export function filterSidebar(
  items: Item[],
  fn: (item: Item) => boolean
): Item[] {
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

export function mapSidebar(items: Item[], fn: (item: Item) => Item): Item[] {
  const newItems = [];
  for (const item of items) {
    if (item.type === "category") {
      item.items = mapSidebar(item.items, fn);
    }
    newItems.push(fn(item));
  }
  return newItems;
}
