import useMatchMedia from "@/hooks/useMatchMedia";
import * as Dialog from "@radix-ui/react-dialog";
import { BiMenuAltLeft as MenuIcon } from "react-icons/bi";
import { MdOutlineClose as CloseIcon } from "react-icons/md";
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
        data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
        />
        <Dialog.Content
          className="fixed left-0 top-0 z-50 w-80
         data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in"
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
