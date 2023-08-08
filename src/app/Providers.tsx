"use client";

import { Provider } from "jotai";
import { PropsWithChildren } from "react";
import CollaborationProvider from "./CollaborationContext";
// import SidebarContextProvider from "@/components/Sidebar/SidebarContextProvider";

function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      <CollaborationProvider />
      {/* <SidebarContextProvider /> */}
      {children}
    </Provider>
  );
}

export default Providers;
