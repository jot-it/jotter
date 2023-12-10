"use client";
import useMatchMedia from "@/hooks/useMatchMedia";
import * as Dialog from "@radix-ui/react-dialog";
import { BiMenuAltLeft as MenuIcon } from "react-icons/bi";
import { CloseIcon } from "@/components/Icons";
import SideNavigation from "./SideNavigation";

function MobileNavigation() {
  const isMobile = useMatchMedia("(max-width: 1023px)");
  if (!isMobile) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="open my notes">
        <MenuIcon className="mr-4 text-3xl" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm 
        data-[state=closed]:fade-out data-[state=closed]:animate-out  data-[state=open]:fade-in data-[state=open]:animate-in"
        />
        <Dialog.Content
          className="fixed left-0 top-0 z-50 w-80 data-[state=open]:animate-in data-[state=closed]:animate-out
         data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
        >
          <Dialog.Title className="sr-only">Browse your notes</Dialog.Title>
          <Dialog.Close
            className="absolute right-0 top-0 z-10 dark:bg-slate-700 px-7 py-4 bg-gray-300 rounded-bl-lg"
            aria-label="close"
          >
            <CloseIcon />
          </Dialog.Close>

          <SideNavigation />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNavigation;
