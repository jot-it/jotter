"use client";
import {
  Sidebar,
  SidebarButton,
  SidebarDivider,
  SidebarItems,
} from "@/components/Sidebar";
import { Item } from "@/components/Sidebar/Item";
import {
  createItem,
  insertItem,
  newPage,
  removeItem,
  setIsNewItem,
  setLabel,
  sidebarState,
} from "@/components/Sidebar/state";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { clearDocument } from "y-indexeddb";

export const activeItemAtom = atom<Item | null>(null);

function SideNavigation() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);
  const updateActiveItem = (item: Item) => {
    setActiveItem({ ...item });
  };

  const handleDelete = async (parent: Item[], item: Item) => {
    // Remove document from cache (IndexDB)
    await clearDocument(item.id);

    // TODO: Remove document from backend database, using a REST endpoint or Next's server actions

    if (item.id === activeItem?.id) {
      // Redirect users to home page to avoid editing a document that no longer exists
      router.push("/");
      setActiveItem(null);
    }

    removeItem(parent, item);
  };

  const handleRename = (item: Item, newLabel: string) => {
    if (item.id === activeItem?.id) {
      setActiveItem({ ...item });
    }

    setLabel(item, newLabel);
    if (item.isNew) {
      setIsNewItem(item, false);
    }
  };

  const handleNewPage = (parent: Item[]) => {
    const page = createItem("link", sidebarState);
    insertItem(parent, page);
  };

  const handleNewCategory = (parent: Item[]) => {
    const category = createItem("category", sidebarState);
    insertItem(parent, category);
  };

  return (
    <Sidebar
      onSelected={updateActiveItem}
      onRename={handleRename}
      onDelete={handleDelete}
      onNewCategory={handleNewCategory}
      onNewPage={handleNewPage}
    >
      <div className="flex-1 overflow-auto">
        <SidebarItems />
      </div>
      <div className="space-y-1">
        <SidebarDivider />
        <SidebarButton onClick={() => handleNewPage(sidebarState)}>
          ADD NEW PAGE
          <AddIcon />
        </SidebarButton>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
