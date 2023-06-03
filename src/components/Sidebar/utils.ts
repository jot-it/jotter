import { ItemProps } from "../Sidebar";

export function filterSidebar(
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

export function mapSidebar(
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
