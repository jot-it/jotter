import Breadcrumbs from "@/components/Breadcrumbs";
import Typography from "@/components/Typography";
import { RiUserAddLine as UserAddIcon } from "react-icons/ri";
import ActiveUsers from "./ActiveUsers";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white/90 p-4 
    shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-slate-850/80"
    >
      <MobileNavigation />
      <Breadcrumbs />
      <ActiveUsers />
      <Typography
        as="button"
        variant="button"
        aria-label="Add collaborator"
        className="inline-flex items-center rounded-full bg-cyan-200 px-3 py-3 font-medium
         text-cyan-900 shadow-sm hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 
         dark:hover:bg-cyan-800 md:rounded-md md:px-4 md:py-2"
      >
        <UserAddIcon />
        <span className="ml-2 hidden md:inline">Share</span>
      </Typography>
    </header>
  );
}
export default Header;
