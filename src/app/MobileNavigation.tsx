import * as Dialog from "@radix-ui/react-dialog";
import { BiMenuAltLeft as MenuIcon } from "react-icons/bi";
import SideNavigation from "./SideNavigation";
import { useEffect, useState } from "react";

function MobileNav() {
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
      <Dialog.Trigger>
        <MenuIcon className="mr-4 text-3xl" aria-label="Menu" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="data-[state=closed]:animate-fade-out fixed inset-0 bg-slate-900/50 backdrop-blur-sm 
        data-[state=open]:animate-fade-in anime"
        />
        <Dialog.Content
          className="fixed left-0 top-0 w-80 
        data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in "
        >
          <Dialog.Title className="sr-only">Browse your notes</Dialog.Title>

          <SideNavigation />

          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNav;
