"use client";

import { useParams } from "next/navigation";
import ActiveUsers from "./ActiveUsers";
import BreadcrumbsShell from "./BreadcrumbsShell";
import DialogCollab from "./DialogCollab";
import MobileNavigation from "./MobileNavigation";
import UserProfileMenu from "./UserProfileMenu";

function Header() {
  const params = useParams();
  const notebookId = params.notebookId as string;

  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white/90 p-4 
    shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-slate-850/80"
    >
      <MobileNavigation />
      <BreadcrumbsShell />
      <div className="ml-auto flex items-center space-x-4">
        <ActiveUsers />
        <DialogCollab notebookId={notebookId} />
        <UserProfileMenu />
      </div>
    </header>
  );
}
export default Header;
