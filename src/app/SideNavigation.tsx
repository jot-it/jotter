"use client";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import { useSidebarDispatch } from "../components/Sidebar/context";
import sidebarConfig from "../sidebarConfig";

function SideNavigation() {
  return (
    <Sidebar items={sidebarConfig}>
      <SidebarContent />
    </Sidebar>
  );
}

function SidebarContent() {
  const dispatch = useSidebarDispatch();
  return (
    <>
      <Sidebar.Items />
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button onClick={() => dispatch({ type: "create" })}>
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </>
  );
}

export default SideNavigation;
