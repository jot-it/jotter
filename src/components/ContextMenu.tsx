import * as Contextmenu from "@radix-ui/react-context-menu";
import { PropsWithChildren, forwardRef } from "react";
import clsx from "clsx";

/* 
 * <ContextMenu>
    <ContextMenu.Trigger> {children} </ContextMenu.Trigger>
    <Context.Menu.Body> {children} </ContextMenu.Options>
    </ContextMenu>
*/

const Trigger = forwardRef<
  HTMLSpanElement,
  Contextmenu.ContextMenuTriggerProps
>(function Trigger({ children, ...props }, ref) {
  return (
    <Contextmenu.Trigger ref={ref} {...props}>
      {children}
    </Contextmenu.Trigger>
  );
});

function ContextMenu({ children }: PropsWithChildren) {
  return (
    <Contextmenu.Root>
      <Contextmenu.Trigger>{children}</Contextmenu.Trigger>
    </Contextmenu.Root>
  );
}

const Option = forwardRef<HTMLDivElement, Contextmenu.MenuItemProps>(
  function Option({ children, className, ...props }, ref) {
    return (
      <Contextmenu.Item
        ref={ref}
        {...props}
        className={clsx(
          className,
          " flex items-center rounded-md px-2 py-1 hover:bg-gray-200/75"
        )}
      >
        {children}
      </Contextmenu.Item>
    );
  }
);

function Divider() {
  return <Contextmenu.Separator className="m-1 h-0.5 bg-gray-200" />;
}

const Body = forwardRef<HTMLDivElement, Contextmenu.MenuContentProps>(
  function Body({ children, ...props }, ref) {
    return (
      <Contextmenu.Content
        className="min-w-[220px] overflow-hidden rounded-lg bg-gray-50 p-2  drop-shadow-md"
        ref={ref}
        {...props}
      >
        {children}
      </Contextmenu.Content>
    );
  }
);

export default Object.assign(ContextMenu, {
  Trigger,
  Body,
  Option,
  Divider,
});
