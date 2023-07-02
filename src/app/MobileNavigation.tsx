import * as Dialog from "@radix-ui/react-dialog";
import { BiMenuAltLeft as MenuIcon } from "react-icons/bi";
import SideNavigation from "./SideNavigation";
import { useEffect, useState } from "react";
import { MdOutlineClose as CloseIcon } from "react-icons/md";

function MobileNavigation() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (!isMobile) return null;

  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="open my notes">
        <MenuIcon className="mr-4 text-3xl"  />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm data-[state=closed]:animate-fade-out 
        data-[state=open]:animate-fade-in"
        />
        <Dialog.Content
          className="fixed left-0 top-0 w-80 
        data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in"
        >
          <Dialog.Title className="sr-only">Browse your notes</Dialog.Title>
          <Dialog.Close
            className="absolute right-0 top-0 z-10 bg-slate-700 px-7 py-4"
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
