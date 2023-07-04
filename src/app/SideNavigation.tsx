"use client";
import { RiAddLine as AddIcon } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import { useSidebarDispatch } from "../components/Sidebar/SidebarContextProvider";

function SideNavigation() {
  const dispatch = useSidebarDispatch();
  
  const handleCreatePage = () => {
    dispatch({
      type: "create",
      newItem: {
        label: "new item",
        type: "link",
      },
    });
  };
  
  return (
    <Sidebar>
      <Sidebar.Items />
      <div className="space-y-1">
        <Sidebar.Divider />
        <Sidebar.Button onClick={handleCreatePage}>
          ADD NEW PAGE
          <AddIcon />
        </Sidebar.Button>
      </div>
    </Sidebar>
  );
}

export default SideNavigation;
