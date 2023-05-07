"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import sidebarConfig from "../sidebarConfig";

function SideNavigation() {
  const [sidebar, setSidebar] = useState(sidebarConfig);

  return (
    <Sidebar>
      {/* Add new page */}
      <Sidebar.ItemList items={sidebar} />
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.AddButton
          onClick={() =>
            setSidebar([
              ...sidebar,
              {
                type: "link",
                label: "New page",
                href: "#new-page",
              },
            ])
          }
        />
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
