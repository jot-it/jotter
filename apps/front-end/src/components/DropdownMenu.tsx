"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  MdCheck as Check,
  MdChevronRight as ChevronRight,
  MdCircle as Circle,
} from "react-icons/md";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import {
  ElementRef,
  ComponentPropsWithoutRef,
  forwardRef,
  HTMLAttributes,
} from "react";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type DropdownMenuSubTriggerRef = ElementRef<
  typeof DropdownMenuPrimitive.SubTrigger
>;

type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuSubTriggerRef,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { className, inset, children, ...props },
  ref,
) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={clsx(itemStyles(), inset && "pl-8", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});

type DropdownMenuSubContentRef = ElementRef<
  typeof DropdownMenuPrimitive.SubContent
>;

type DrodownMenuSubContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>;

const DropdownMenuSubContent = forwardRef<
  DropdownMenuSubContentRef,
  DrodownMenuSubContentProps
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={clsx(contentStyles({ className }))}
      {...props}
    />
  );
});

export const contentStyles = cva([
  "dark:text-inheritz-50 z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-600 p-1 shadow-md dark:bg-slate-700",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
]);

type DropdownMenuContentRef = ElementRef<typeof DropdownMenuPrimitive.Content>;

type DroddownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

const DropdownMenuContent = forwardRef<
  DropdownMenuContentRef,
  DroddownMenuContentProps
>(function DropdownMenuContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={contentStyles({ className })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export const itemStyles = cva([
  "relative flex cursor-default select-none focus:bg-cyan-800 focus:text-cyan-300",
  "items-center rounded-md px-2 py-1.5 text-base outline-none transition-colors",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
]);

type DropdownMenuItemRef = ElementRef<typeof DropdownMenuPrimitive.Item>;

type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean;
};

const DropdownMenuItem = forwardRef<DropdownMenuItemRef, DropdownMenuItemProps>(
  function DropdownMenuItem({ className, inset, ...props }, ref) {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={clsx(itemStyles({ className }), inset && "pl-8")}
        {...props}
      />
    );
  },
);

export const checkboxItemStyles = cva([itemStyles(), "pl-8 pr-2"]);

type DropdownMenuCheckboxItemRef = ElementRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuCheckboxItemRef,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  { className, children, checked, ...props },
  ref,
) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={checkboxItemStyles({ className })}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export const radioStyles = cva([
  "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm",
  "py-1.5 pl-8 pr-2 text-base outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
]);

type DropdownMenuRadioItemRef = ElementRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

const DropdownMenuRadioItem = forwardRef<
  DropdownMenuRadioItemRef,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={radioStyles({ className })}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});

type DropdownMenuLabelRef = ElementRef<typeof DropdownMenuPrimitive.Label>;

type DropdownMenuLabelProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean;
};
export const menuLabelStyles = cva("px-2 py-1.5 text-base font-semibold");

const DropdownMenuLabel = forwardRef<
  DropdownMenuLabelRef,
  DropdownMenuLabelProps
>(function DropdownMenuLabelRef({ className, inset, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={clsx(menuLabelStyles(), className, inset && "pl-8")}
      {...props}
    />
  );
});

export const menuSeparatorStyles = cva("-mx-1 my-1 h-px bg-slate-600");
type DropdownMenuSeparatorRef = ElementRef<
  typeof DropdownMenuPrimitive.Separator
>;

type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

const DropdownMenuSeparator = forwardRef<
  DropdownMenuSeparatorRef,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={menuSeparatorStyles({ className })}
      {...props}
    />
  );
});

type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const shortcutStyles = cva("ml-auto text-sm tracking-widest opacity-60");

function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return <span className={shortcutStyles({ className })} {...props} />;
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
