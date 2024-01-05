"use client";
import Button from "@/components/Button";
import { BookIcon, FileIcon } from "@/components/Icons";
import { newCategory, newPage, sidebarState } from "@/components/Sidebar/state";
import useWorkspace from "@/hooks/useWorkspace";

function HomeScreenActions() {
  const workspace = useWorkspace();
  return (
    <ul className="space-y-1">
      <li>
        <Button variant="link" onClick={() => newPage(sidebarState, workspace)}>
          <FileIcon className="mr-2" />
          New Note
        </Button>
      </li>
      <li>
        <Button
          variant="link"
          onClick={() => newCategory(sidebarState, workspace)}
        >
          <BookIcon className="mr-2" />
          New Category
        </Button>
      </li>
    </ul>
  );
}

export default HomeScreenActions;
