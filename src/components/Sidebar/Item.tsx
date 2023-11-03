import { useEffect, useState } from "react";
import { BreadcrumbItem } from "../Breadcrumbs";
import CategoryWithMenu, { CategoryMenuProps } from "./Category";
import LinkWithMenu from "./Link";
import {
  newCategory,
  newPage,
  removeItem,
  setIsNewItem,
  setLabel,
} from "./state";
import { usePathname, useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { persistenceProvider } from "@/lib/collaboration";

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

export const itemVariant = {
  root: "rounded-lg p-3 text-left",
  active:
    "dark:bg-cyan-900 bg-cyan-400/20  dark:text-cyan-200 text-cyan-950 dark:hover:bg-cyan-800\
     hover:bg-gray-300 hover:bg-cyan-400/30",
  inactive:
    "hover:bg-gray-300 dark:hover:bg-slate-700\
    focus-within:dark:bg-slate-700 focus-within:bg-gray-300",
} as const;

function SidebarItem({ item, parent, setOpen }: SidebarItemProps) {
  const snap = useSnapshot(item);
  const isActive = usePathname() === snap.href;
  const router = useRouter();

  const handleNewPage: CategoryMenuProps["onNewPage"] = (category) => {
    newPage(category.items, category.crumbs);
  };

  const handleDelete: SidebarItemBaseProps["onDelete"] = (parent, item) => {
    removeItem(parent, item);

    // Also delete the item from the database
    persistenceProvider?.del(item.id);

    if (isActive) {
      router.replace("/");
    }
  };

  const handleNewCategory: CategoryMenuProps["onNewCategory"] = (category) => {
    newCategory(category.items, category.crumbs);
  };

  const handleRename: SidebarItemBaseProps["onRename"] = (item, newLabel) => {
    setLabel(item, newLabel);
    if (item.isNew) {
      setIsNewItem(item, false);
    }
  };

  // Update the document title to the name of this note
  useEffect(() => {
    if (isActive) {
      document.title = snap.label;
    }
  }, [isActive, snap.label]);

  switch (item.type) {
    case "category":
      return (
        <CategoryWithMenu
          category={item}
          parent={parent}
          setOpen={setOpen}
          onNewPage={handleNewPage}
          onNewCategory={handleNewCategory}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      );
    case "link":
      return (
        <LinkWithMenu
          link={item}
          parent={parent}
          key={item.id}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      );
  }
}

export default SidebarItem;
