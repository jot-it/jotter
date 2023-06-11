import * as RadixSelect from "@radix-ui/react-select";
import { forwardRef } from "react";
import { RiArrowDownSLine as ChevronDown } from "react-icons/ri";
import Typography from "./Typography";

const Select = forwardRef<HTMLButtonElement, RadixSelect.SelectProps>(
  // Extract all the props that are meant to be passed to the <select> element,
  // and pass the rest down to the trigger, so that we can
  // insert any additional accesibility props to the trigger itself.
  function Select(
    {
      children,
      defaultValue,
      value,
      onValueChange,
      defaultOpen,
      open,
      onOpenChange,
      dir,
      name,
      disabled,
      required,
      ...rest
    },
    forwardedRef
  ) {
    return (
      <RadixSelect.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        dir={dir}
        name={name}
        disabled={disabled}
        required={required}
      >
        <RadixSelect.Trigger
          className="inline-flex items-center rounded-md px-3 py-1 
          focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Heading style"
          {...rest}
          ref={forwardedRef}
        >
          <RadixSelect.Value />
          <RadixSelect.Icon className="ml-2">
            <ChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Content
          className="overflow-hidden rounded-md border bg-white shadow-lg 
          dark:border-slate-600 dark:bg-slate-700"
          position="popper"
        >
          <RadixSelect.ScrollUpButton className="py-1 shadow">
            <ChevronDown className="mx-auto rotate-180" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="w-32 py-1">
            {children}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="py-1 shadow">
            <ChevronDown className="mx-auto" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Root>
    );
  }
);

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(
  function SelectItem({ children, ...props }, forwardedRef) {
    return (
      <RadixSelect.Item
        {...props}
        ref={forwardedRef}
        className="select-none px-3 py-2 data-[highlighted]:bg-gray-200 
        data-[highlighted]:outline-none  dark:data-[highlighted]:bg-cyan-900 dark:data-[highlighted]:text-cyan-200"
      >
        <RadixSelect.ItemText asChild>
          <Typography variant="body1">{children}</Typography>
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  }
);

export default Object.assign(Select, { Item: SelectItem });
