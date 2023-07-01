import Avatar from "@/components/Avatar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Typography from "@/components/Typography";
import Link from "next/link";
import {
  RiBook2Line as BookIcon,
  RiUserAddLine as UserAddIcon,
} from "react-icons/ri";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header className="flex items-center border-b border-gray-200 p-4 shadow-sm dark:border-gray-700">
      <MobileNavigation />
      <Breadcrumbs aria-label="Breadcrumb">
        <Link href="#">
          <Typography as="span" variant="body1">
            <BookIcon className="mr-1 inline-block text-lg" />
            Chapter 1
          </Typography>
        </Link>
        <Link href="#">Section a</Link>
        <Link href="#">Topic 1</Link>
      </Breadcrumbs>

      {/* Current users in this notebook */}
      <div className="ml-auto mr-4 flex -space-x-1 text-white">
        <Avatar className="bg-gray-200 text-gray-700" size="lg">
          +5
        </Avatar>
        <Avatar className="bg-orange-500 ring ring-white dark:ring-0" size="lg">
          JD
        </Avatar>
        <Avatar className="bg-red-500 ring ring-white dark:ring-0" size="lg">
          KS
        </Avatar>
        <Avatar className="bg-indigo-500 ring ring-white dark:ring-0" size="lg">
          MG
        </Avatar>
      </div>

      <Typography
        as="button"
        variant="button"
        aria-label="Add collaborator"
        className="inline-flex items-center rounded-full bg-cyan-200 px-3 py-3 font-medium
         text-cyan-900 shadow-sm hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 
         dark:hover:bg-cyan-800 md:rounded-md md:px-4 md:py-2"
      >
        <UserAddIcon  />
        <span className="ml-2 hidden md:inline">Share</span>
      </Typography>
    </header>
  );
}

export default Header;
