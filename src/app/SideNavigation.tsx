"use client";
import { useSetAtom } from "jotai";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { newPage, sidebarState } from "@/components/Sidebar/state";
import { breadcrumbsAtom } from "@/components/Breadcrumbs";
import {
  Sidebar,
  SidebarButton,
  SidebarDivider,
  SidebarItems,
} from "@/components/Sidebar";

function SideNavigation() {
  const setBreadcrumbs = useSetAtom(breadcrumbsAtom);

  return (
    // @ts-ignore
    <Sidebar onSelected={(item) => setBreadcrumbs(item.crumbs)}>
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
