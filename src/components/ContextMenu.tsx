import * as Contextmenu from "@radix-ui/react-context-menu";
import clsx from "clsx";
import { forwardRef } from "react";
import { Category, ItemProps, Link } from "./Sidebar";

type ContextMenuProps = {
  item: ItemProps;
};

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

function ContextMenu({
  children,
  item,
}: React.PropsWithChildren<ContextMenuProps>) {
  const sidebarItem =
    item.type === "category" ? <Category {...item} /> : <Link {...item} />;

  return (
    <Contextmenu.Root>
      <Trigger>
        {sidebarItem}
        <Body>{children}</Body>
      </Trigger>
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
          " flex select-none items-center rounded-md px-2 py-1 data-[highlighted]:bg-gray-200/75 dark:data-[highlighted]:bg-slate-800 dark:data-[highlighted]:text-cyan-300"
        )}
      >
        {children}
      </Contextmenu.Item>
    );
  }
);

function Divider() {
  return (
    <Contextmenu.Separator className="m-1 h-0.5 bg-gray-200 dark:bg-slate-600" />
  );
}

const Body = forwardRef<HTMLDivElement, Contextmenu.MenuContentProps>(
  function Body({ children, ...props }, ref) {
    return (
      <Contextmenu.Content
        className="min-w-[220px] overflow-hidden rounded-lg bg-gray-50  p-2 drop-shadow-md data-[disabled]:text-gray-500 dark:bg-slate-700"
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
  Option,
  Divider,
});
