import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import React, { PropsWithChildren, forwardRef } from "react";
import {
  DropdownMenuShortcut,
  contentStyles,
  itemStyles,
  menuSeparatorStyles,
} from "./DropdownMenu";
import clsx from "clsx";

export type ContextMenuProps = PropsWithChildren;
export type IconProps = PropsWithChildren<{ label?: string }>;
export type OptionProps = ContextMenuPrimitive.MenuItemProps;

function ContextMenu({ children }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root>{children}</ContextMenuPrimitive.Root>;
}

const Option = forwardRef<HTMLDivElement, OptionProps>(function Option(
  { children, className, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      {...props}
      className={itemStyles({ className })}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
});

function Icon({ children, label }: IconProps) {
  const Child = React.Children.only(children);
  return (
    <>
      {React.cloneElement(Child as React.ReactElement, {
        className: "mr-2 h-4 w-4",
        "aria-hidden": true,
        focusable: false,
      })}
      {label && <span className="sr-only">{label}</span>}
    </>
  );
}

function Divider() {
  return <ContextMenuPrimitive.Separator className={menuSeparatorStyles()} />;
}

const Content = forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.MenuContentProps
>(function Body({ children, className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Content
      className={clsx(contentStyles({ className }), "w-56")}
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
  Icon,
  Trigger: ContextMenuPrimitive.Trigger,
  Shortcut: DropdownMenuShortcut,
});
