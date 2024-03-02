import { getNotebookById } from "@/actions/document";
import { getToken } from "@/actions/token";
import { getSession } from "@/config/auth-options";
import { StartCollaboration } from "@/lib/collaboration";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import Header from "../Header";
import SideNavigation from "../SideNavigation";

type LayoutProps = PropsWithChildren<{
  params: {
    notebookId: string;
  };
}>;

async function Layout({ children, params }: LayoutProps) {
  const session = await getSession();
  const notebook = await getNotebookById(params.notebookId);

  if (!notebook) {
    return notFound();
  }

  const token = await getToken([]);
  return (
    <div className="grid lg:grid-cols-[20rem_auto]">
      <aside className="hidden lg:block">
        <SideNavigation />
      </aside>
      <div>
        <Header />
        {session?.user && (
          <StartCollaboration
            user={session.user}
            notebookName={notebook.document.documentName}
            initialToken={token}
            onTokenRefresh={async () => {
              "use server";
              return getToken([]);
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default Layout;
