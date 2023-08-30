"use client";
import { useSetAtom } from "jotai";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import { breadcrumbsAtom } from "./Header";

function SideNavigation() {
  const setBreadcrumbs = useSetAtom(breadcrumbsAtom);

  return (
    <Sidebar onSelected={(item) => setBreadcrumbs(item.crumbs)}>
      <div className="flex-1 overflow-auto">
        <Sidebar.Items />
      </div>
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button>
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
