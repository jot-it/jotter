import Link from "next/link";
import Avatar from "../components/Avatar";
import Breadcrumbs from "../components/Breadcrumbs";
import Typography from "../components/Typography";
import { RiBook2Line as BookIcon } from "react-icons/ri";

function Header() {
  return (
    <header className="flex items-center border-b border-gray-200 p-4 shadow-sm dark:border-gray-700">
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
        className="rounded-md bg-cyan-200 px-4 py-2 font-medium text-cyan-900 shadow-sm hover:bg-cyan-300 
         dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800"
      >
        Share
      </Typography>
    </header>
  );
}

export default Header;
