"use client";
import Button from "@/components/Button";
import { BookIcon, FileIcon } from "@/components/Icons";
import { newCategory, newPage, sidebarState } from "@/components/Sidebar/state";

function HomeScreenActions() {
  return (
    <ul className="space-y-1">
      <li>
        <Button variant="link" onClick={() => newPage(sidebarState)}>
          <FileIcon className="mr-2" />
          New Note
        </Button>
      </li>
      <li>
        <Button variant="link" onClick={() => newCategory(sidebarState)}>
          <BookIcon className="mr-2" />
          New Category
        </Button>
      </li>
    </ul>
  );
}

export default HomeScreenActions;
