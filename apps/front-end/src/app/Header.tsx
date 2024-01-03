import { lazy } from "react";
import ActiveUsers from "./ActiveUsers";
import BreadcrumbsShell from "./BreadcrumbsShell";
import MobileNavigation from "./MobileNavigation";
const DialogCollab = lazy(() => import("@/app/DialogCollab"));

function Header() {
  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white/90 p-4 
    shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-slate-850/80"
    >
      <MobileNavigation />
      <BreadcrumbsShell />
      <ActiveUsers />

      <DialogCollab />
    </header>
  );
}
export default Header;
