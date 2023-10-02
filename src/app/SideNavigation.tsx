"use client";
import { useSetAtom } from "jotai";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import { newPage, sidebarState } from "@/components/Sidebar/state";
import { breadcrumbsAtom } from "@/components/Breadcrumbs";

function SideNavigation() {
  const setBreadcrumbs = useSetAtom(breadcrumbsAtom);

  return (
    // @ts-ignore
    <Sidebar onSelected={(item) => setBreadcrumbs(item.crumbs)}>
      <div className="flex-1 overflow-auto">
        <Sidebar.Items />
      </div>
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button onClick={() => newPage(sidebarState)}>
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
