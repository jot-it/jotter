"use client";
import Avatar from "@/components/Avatar";
import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { SidebarProps } from "@/components/Sidebar";
import Typography from "@/components/Typography";
import { useParams } from "next/navigation";
import {
  RiBook2Line as BookIcon,
  RiUserAddLine as UserAddIcon,
} from "react-icons/ri";
import MobileNavigation from "./MobileNavigation";

type HeaderProps = {
  items: SidebarProps["items"];
};

function Header({ items }: HeaderProps) {
  const { id } = useParams();
  const crumbs = getBreadcrumbs(items, id);
  return (
    <header
      className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white/90 p-4 
    shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-slate-850/80"
    >
      <MobileNavigation />
      <Breadcrumbs items={crumbs} />
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
        <UserAddIcon />
        <span className="ml-2 hidden md:inline">Share</span>
      </Typography>
    </header>
  );
}

function getBreadcrumbs(
  items: SidebarProps["items"],
  id: string
): BreadcrumbItem[] {
  const crumbs = [];
  for (const item of items) {
    crumbs.push({
      href: item.href,
      label: item.label,
    });

    if (item.id === id) {
      break;
    }

    if (item.type === "category") {
      const path = getBreadcrumbs(item.items, id);
      const pathContainsId = path.length > 0;
      if (pathContainsId) {
        crumbs.push(...path);
        break;
      }
    }
    crumbs.pop();
  }
  return crumbs;
}

export default Header;
