"use client";
import { newCategory, newPage, sidebarState } from "@/components/Sidebar/state";
import Typography from "@/components/Typography";
import { CgFile as FileIcon } from "react-icons/cg";

function HomeScreenActions() {
  return (
    <ul className="space-y-1">
      <li>
        <button
          className="inline-flex items-center"
          onClick={() => newPage(sidebarState)}
        >
          <FileIcon className="mr-2" />
          <Typography variant="body1">New Note</Typography>
        </button>
      </li>
      <li>
        <button
          className="inline-flex items-center"
          onClick={() => newCategory(sidebarState)}
        >
          <FileIcon className="mr-2" />
          <Typography variant="body1">New Chapter</Typography>
        </button>
      </li>
    </ul>
  );
}

export default HomeScreenActions;
