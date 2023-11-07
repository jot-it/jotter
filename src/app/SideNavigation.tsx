"use client";
import {
  Sidebar,
  SidebarButton,
  SidebarDivider,
  SidebarItems,
} from "@/components/Sidebar";
import { Item } from "@/components/Sidebar/Item";
import { newPage, sidebarState } from "@/components/Sidebar/state";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { RiAddLine as AddIcon } from "react-icons/ri";

export const activeItemAtom = atom<Item | null>(null);

function SideNavigation() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);
  const updateActiveItem = (item: Item) => {
    setActiveItem({ ...item });
  };

  const handleNewItem = (item: Item) => {
    router.push(item.href);
  };

  const handleDelete = (item: Item) => {
    // TODO: Refactor this to its own domain
    window.indexedDB.deleteDatabase(item.id);

    if (item.id === activeItem?.id) {
      // Redirect users to home page to avoid editing a document that no longer exists
      router.push("/");
      setActiveItem(null);
    }
  };

  return (
    <Sidebar
      onSelected={updateActiveItem}
      onRename={updateActiveItem}
      onNewCategory={handleNewItem}
      onNewPage={handleNewItem}
      onDelete={handleDelete}
    >
      <div className="flex-1 overflow-auto">
        <SidebarItems />
      </div>
      <div className="space-y-1">
        <SidebarDivider />
        <SidebarButton onClick={() => newPage(sidebarState)}>
          ADD NEW PAGE
          <AddIcon />
        </SidebarButton>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
