import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { BreadcrumbItem } from "../Breadcrumbs";
import CategoryWithMenu from "./Category";
import LinkWithMenu from "./Link";

export type ItemBase = {
  href: string;
  /**
   * Label to display
   */
  label: string;
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Was the item just created?
   */
  isNew?: boolean;
  /**
   * Path to this item relative to the root of the sidebar
   */
  crumbs: BreadcrumbItem[];
};

export type SidebarItemBaseProps = {
  onRename(item: Item, newLabel: string): void;
  onDelete(parent: Item[], item: Item): void;
};

export type CategoryItem = ItemBase & {
  type: "category";
  items: Item[];
};

export type LinkItem = ItemBase & {
  type: "link";
};

export type Item = CategoryItem | LinkItem;

export type ItemWithParent<T> = T & {
  parent: Item[];
};

type SidebarItemProps = ItemWithParent<{
  item: Item;
  /**
   * Set the open state of the accordion
   */
  setOpen(id: string): void;
}>;

const UNTITLED_PAGE_TITLE = "Untitled";

export const itemVariant = {
  root: "rounded-lg p-3 text-left break-words ring-cyan-600 focus-visible:outline-none focus-visible:ring-2 ring-inset",
  active:
    "dark:bg-cyan-900 bg-cyan-400/20  dark:text-cyan-200 text-cyan-950 dark:hover:bg-cyan-800\
     hover:bg-gray-300 hover:bg-cyan-400/30 ",
  inactive:
    "hover:bg-gray-300 dark:hover:bg-slate-700\
    focus-within:dark:bg-slate-700 focus-within:bg-gray-300",
} as const;

function SidebarItem({ item, parent, setOpen }: SidebarItemProps) {
  const snap = useSnapshot(item);
  const isActive = usePathname() === snap.href;

  // Update the document title to the name of this note
  useEffect(() => {
    if (isActive) {
      document.title = snap.label.length ? snap.label : UNTITLED_PAGE_TITLE;
    }
  }, [isActive, snap.label]);

  switch (item.type) {
    case "category":
      return (
        <CategoryWithMenu category={item} parent={parent} setOpen={setOpen} />
      );
    case "link":
      return <LinkWithMenu link={item} parent={parent} key={item.id} />;
  }
}

export default SidebarItem;
