"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useAtomValue } from "jotai";
import { activeItemAtom } from "./SideNavigation";

function BreadcrumbsShell() {
  const activeItem = useAtomValue(activeItemAtom);
  if (!activeItem) return null;
  return <Breadcrumbs items={activeItem.crumbs} />;
}

export default BreadcrumbsShell;
