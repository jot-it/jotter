import { getNotebookById } from "@/actions/document";
import NoSSR from "@/components/NoSSR";
import { getSession } from "@/config/auth-options";
import { StartCollaboration } from "@/lib/collaboration";
import { PropsWithChildren } from "react";
import Header from "../Header";
import SideNavigation from "../SideNavigation";
import { notFound } from "next/navigation";
import { getToken } from "@/actions/token";

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
        <NoSSR>
          {session?.user && (
            <StartCollaboration
              user={session.user}
              notebookName={notebook.documentName}
              initialToken={token}
              onTokenRefresh={async () => {
                "use server";
                return getToken([]);
              }}
            />
          )}
        </NoSSR>
        {children}
      </div>
    </div>
  );
}

export default Layout;
