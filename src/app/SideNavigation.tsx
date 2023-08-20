"use client";
import { useSidebarReducer } from "@/components/Sidebar/state";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import { useSetAtom } from "jotai";
import { breadcrumbsAtom } from "./Header";

function SideNavigation() {
  const [items, dispatch] = useSidebarReducer([]);
  const setBreadcrumbs = useSetAtom(breadcrumbsAtom);

  return (
    <Sidebar>
      <div className="flex-1 overflow-auto">
        <Sidebar.Items
          items={items}
          dispatch={dispatch}
          onSelected={(item) => setBreadcrumbs(item.crumbs)}
        />
      </div>
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button
          onClick={() => dispatch({ type: "add_item", itemType: "link" })}
        >
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
