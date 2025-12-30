"use client";

import { StartCollaboration } from "@/lib/collaboration/StartCollaboration";
import { PropsWithChildren, useEffect } from "react";
import Header from "../Header";
import SideNavigation from "../SideNavigation";
import { useIsCollaborationEnabled } from "@/lib/collaboration";
import { useLocalIdentity } from "@/lib/identity-provider";

type LayoutProps = PropsWithChildren<{
  params: {
    notebookId: string;
  };
}>;

function Layout({ children, params }: LayoutProps) {
  const [isCollaborationEnabled, setIsCollaborationEnabled] = useIsCollaborationEnabled();
  const identity = useLocalIdentity();

  useEffect(() => {
    if (identity.id !== params.notebookId) {
      // Enable collaboration by default when accessing a notebook that is not your own
      setIsCollaborationEnabled(true);
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-[20rem_auto]">
      <aside className="hidden lg:block">
        <SideNavigation />
      </aside>
      <div>
        <Header />
        {isCollaborationEnabled && <StartCollaboration notebookId={params.notebookId} />}
        {children}
      </div>
    </div>
  );
}

export default Layout;
