"use client";
import { createDocument, deleteDocument } from "@/actions/document";
import {
  Sidebar,
  SidebarButton,
  SidebarDivider,
  SidebarItems,
} from "@/components/Sidebar";
import { Item } from "@/components/Sidebar/Item";
import {
  ParentItem,
  createItem,
  insertItem,
  removeItem,
  setHref,
  setId,
  setIsNewItem,
  setLabel,
  sidebarState,
} from "@/components/Sidebar/state";
import Skeleton from "@/components/Skeleton";
import { useIsSynced, useRootDocument } from "@/lib/collaboration";
import { atom, useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { bind } from "valtio-yjs";
import { clearDocument } from "y-indexeddb";

export const activeItemAtom = atom<Item | null>(null);

function SideNavigation() {
  // Synchorize Yjs shared-types with valtio proxy state
  const loaded = useYjs();
  const router = useRouter();
  const params = useParams<{ notebookId: string; noteId: string }>();
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);
  const updateActiveItem = (item: Item) => {
    setActiveItem({ ...item });
  };

  const handleDelete = async (parent: Item[], item: Item) => {
    removeItem(parent, item);
    if (item.id === activeItem?.id) {
      // Redirect users to home page to avoid editing a document that no longer exists
      router.push(`/${params.notebookId}`);
      setActiveItem(null);
    }

    // Remove documents from cache (IndexDB) and the main database
    try {
      await Promise.all([clearDocument(item.id), deleteDocument(item.id)]);
    } catch (error) {
      // TODO Show a toast with an error message
      // TODO Re-insert the document to allow the user to retry
      console.log(error);
    }
  };

  const handleRename = async (item: Item, newLabel: string) => {
    if (item.id === activeItem?.id) {
      setActiveItem({ ...item });
    }

    setLabel(item, newLabel);
    if (item.isNew) {
      // The user finished editing, so we create the respective document
      // on the database to associate it with this user
      const doc = await createDocument(params.notebookId);
      setId(item, doc.name);
      setHref(item, `/${params.notebookId}/${doc.name}`);
      setIsNewItem(item, false);
    }
  };

  const handleNewPage = async (parent: ParentItem) => {
    const page = createItem("link", []);
    insertItem(parent, page);
  };

  const handleNewCategory = async (parent: ParentItem) => {
    const category = createItem("category", []);
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
        {loaded ? <SidebarItems /> : <SidebarItemsSkeleton />}
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

function useYjs() {
  const rootDocument = useRootDocument();
  const isSynced = useIsSynced();
  useEffect(() => {
    return bind(sidebarState, rootDocument.getArray("sidebar"));
  }, [rootDocument]);

  return isSynced;
}

function SidebarItemsSkeleton() {
  return (
    <div className="space-y-1">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default SideNavigation;
