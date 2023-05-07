import * as Toolbar from "@radix-ui/react-toolbar";
import * as Select from "@radix-ui/react-select";
import {
  RiArrowDownSLine as ChevronDown,
  RiBold as Bold,
  RiItalic as Italic,
  RiUnderline as Underline,
  RiStrikethrough as StrikeThrough,
} from "react-icons/ri";
import { forwardRef } from "react";
import Typography from "./Typography";

function EditorToolbar() {
  return (
    <Toolbar.Root className="flex flex-grow-0 rounded-lg border p-3 text-gray-700 shadow-md">
      <Toolbar.Button asChild>
        <HeadingSelect />
      </Toolbar.Button>

      <Toolbar.Separator className="mx-2 w-[1px] bg-gray-300" />

      <Toolbar.ToggleGroup
        type="multiple"
        className="flex items-center gap-[2px] text-lg"
      >
        <ToolbarToggleItem value="bold">
          <Bold />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic">
          <Italic />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="underline">
          <Underline />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="strike-through">
          <StrikeThrough />
        </ToolbarToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}

const ToolbarToggleItem = forwardRef<
  HTMLButtonElement,
  Toolbar.ToolbarToggleItemProps
>(function ToolbarToggleItem({ children, value, ...props }, forwardedRef) {
  return (
    <Toolbar.ToggleItem
      {...props}
      value={value}
      className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 data-[state=on]:bg-gray-100"
      ref={forwardedRef}
    >
      {children}
    </Toolbar.ToggleItem>
  );
});

const HeadingSelect = forwardRef<HTMLButtonElement, Toolbar.ToolbarButtonProps>(
  function HeadingSelect(props, forwardedRef) {
    return (
      <Select.Root>
        <Select.Trigger
          {...props}
          className="inline-flex items-center rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Heading style"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Heading 1" />
          <Select.Icon className="ml-2">
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className="overflow-hidden rounded-md border bg-white shadow-lg">
          <Select.ScrollUpButton className="py-1 shadow">
            <ChevronDown className="mx-auto rotate-180" />
          </Select.ScrollUpButton>

          <Select.Viewport className="w-32 py-1">
            <SelectItem value="heading 1">Heading 1</SelectItem>
            <SelectItem value="heading 2">Heading 2</SelectItem>
            <SelectItem value="heading 3">Heading 3</SelectItem>
            <SelectItem value="heading 4">Heading 4</SelectItem>
            <SelectItem value="heading 5">Heading 5</SelectItem>
            <SelectItem value="heading 6">Heading 6</SelectItem>
          </Select.Viewport>

          <Select.ScrollDownButton className="py-1 shadow">
            <ChevronDown className="mx-auto" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    );
  }
);

const SelectItem = forwardRef<HTMLDivElement, Select.SelectItemProps>(
  function SelectItem({ children, value, ...props }, forwardedRef) {
    return (
      <Select.Item
        {...props}
        value={value}
        className="px-3 py-2 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
        ref={forwardedRef}
      >
        <Select.ItemText asChild>
          <Typography variant="body1">{children}</Typography>
        </Select.ItemText>
      </Select.Item>
    );
  }
);

export default EditorToolbar;
