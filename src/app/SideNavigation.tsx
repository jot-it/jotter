"use client";
import { RiAddLine as AddIcon } from "react-icons/ri";
import ContextMenu from "../components/ContextMenu";
import Sidebar, { ItemProps } from "../components/Sidebar";
import { useSidebarDispatch } from "../components/Sidebar/context";
import { SidebarOption } from "../components/Sidebar/optionsContexMenu";
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

  const item: ItemProps = {
    label: "new item",
    id: crypto.randomUUID(),
    href: "#ni001",
    type: "link",
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <ContextMenu>
          <Sidebar.Items />
          <SidebarOption />
        </ContextMenu>
      </div>

      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button
          onClick={() => dispatch({ type: "create", newItem: item })}
        >
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </>
  );
}

export default SideNavigation;
