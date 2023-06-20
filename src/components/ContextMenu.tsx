import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import clsx from "clsx";
import { PropsWithChildren, ReactNode, forwardRef } from "react";

type ContextMenuProps = PropsWithChildren<{
  /** Element that will have contextual menu behaviour. */
  trigger: ReactNode;
}>;

function ContextMenu({ children, trigger }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>{trigger}</ContextMenuPrimitive.Trigger>
      {children}
    </ContextMenuPrimitive.Root>
  );
}

const Option = forwardRef<HTMLDivElement, ContextMenuPrimitive.MenuItemProps>(
  function Option({ children, className, ...props }, ref) {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        {...props}
        className={clsx(
          className,
          "flex select-none items-center rounded-md px-2 py-1 data-[highlighted]:bg-gray-200/75",
          "dark:data-[highlighted]:bg-slate-800 dark:data-[highlighted]:text-cyan-300"
        )}
      >
        {children}
      </ContextMenuPrimitive.Item>
    );
  }
);

function Divider() {
  return (
    <ContextMenuPrimitive.Separator className="m-1 h-0.5 bg-gray-200 dark:bg-slate-600" />
  );
}

const Content = forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.MenuContentProps
>(function Body({ children, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Content
      className="min-w-[220px] overflow-hidden rounded-lg bg-gray-50  p-2 drop-shadow-md data-[disabled]:text-gray-500 dark:bg-slate-700"
      ref={ref}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Content>
  );
});

export default Object.assign(ContextMenu, {
  Option,
  Content,
  Divider,
});
