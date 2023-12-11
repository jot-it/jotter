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
import { clearDocument } from "y-indexeddb";

export const activeItemAtom = atom<Item | null>(null);

function SideNavigation() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);
  const updateActiveItem = (item: Item) => {
    setActiveItem({ ...item });
  };

  const handleDelete = async (item: Item) => {
    // Remove document from cache (IndexDB)
    await clearDocument(item.id);

    // TODO: Remove document from backend database, using a REST endpoint or Next's server actions

    if (item.id === activeItem?.id) {
      // Redirect users to home page to avoid editing a document that no longer exists
      router.push("/");
      setActiveItem(null);
    }
  };

  const handleRename = (item: Item) => {
    if (item.id === activeItem?.id) {
      setActiveItem({ ...item });
    }
  };

  return (
    <Sidebar
      onSelected={updateActiveItem}
      onRename={handleRename}
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
