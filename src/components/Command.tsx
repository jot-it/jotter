import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import clsx from "clsx";
import { SearchIcon } from "./Icons";

type CommandRef = ElementRef<typeof CommandPrimitive>;
type CommandProps = ComponentPropsWithoutRef<typeof CommandPrimitive>;

const Command = forwardRef<CommandRef, CommandProps>(function Command(
  { children, className, ...props },
  ref,
) {
  return (
    <CommandPrimitive
      className={clsx(
        "rounded-lg text-gray-700 dark:bg-slate-700 dark:text-inherit",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </CommandPrimitive>
  );
});

type CommandInputRef = ElementRef<typeof CommandPrimitive.Input>;
type CommandInputProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;

const CommandInput = forwardRef<CommandInputRef, CommandInputProps>(
  function CommandInput({ className, ...props }, ref) {
    return (
      <div className="flex items-center border-b border-slate-500 px-2">
        <SearchIcon className="mr-2 shrink-0 grow-0 text-lg" />
        <CommandPrimitive.Input
          className={clsx(
            "w-full grow bg-transparent py-3 focus:outline-none",
            className,
          )}
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

type CommandListRef = ElementRef<typeof CommandPrimitive.List>;
type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

const CommandList = forwardRef<CommandListRef, CommandListProps>(
  function CommandList({ className, children, ...props }, ref) {
    return (
      <CommandPrimitive.List
        className={clsx("max-h-[300px] overflow-auto p-1", className)}
        {...props}
        ref={ref}
      >
        {children}
      </CommandPrimitive.List>
    );
  },
);

type CommandItemRef = ElementRef<typeof CommandPrimitive.Item>;
type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

const CommandItem = forwardRef<CommandItemRef, CommandItemProps>(
  function CommandItem({ className, children, ...props }, ref) {
    return (
      <CommandPrimitive.Item
        className={clsx(
          "cursor-pointer rounded-md px-2 py-1 text-base aria-[selected=true]:bg-cyan-200",
          "dark:aria-[selected=true]:bg-cyan-800 dark:aria-[selected=true]:text-cyan-300",
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </CommandPrimitive.Item>
    );
  },
);

type CommandEmptyRef = ElementRef<typeof CommandPrimitive.Empty>;
type CommandEmptyProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

const CommandEmpty = forwardRef<CommandEmptyRef, CommandEmptyProps>(
  function CommandEmpty({ className, children, ...props }, ref) {
    return (
      <CommandPrimitive.Empty
        className={clsx("px-2 py-1", className)}
        {...props}
        ref={ref}
      >
        {children}
      </CommandPrimitive.Empty>
    );
  },
);

export { Command, CommandInput, CommandList, CommandItem, CommandEmpty };
