import { StartCollaboration } from "@/lib/collaboration/StartCollaboration";
import { PropsWithChildren } from "react";
import Header from "../Header";
import SideNavigation from "../SideNavigation";

type LayoutProps = PropsWithChildren<{
  params: {
    notebookId: string;
  };
}>;

async function Layout({ children, params }: LayoutProps) {
  return (
    <div className="grid lg:grid-cols-[20rem_auto]">
      <aside className="hidden lg:block">
        <SideNavigation />
      </aside>
      <div>
        <Header />
        <StartCollaboration notebookId={params.notebookId} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
