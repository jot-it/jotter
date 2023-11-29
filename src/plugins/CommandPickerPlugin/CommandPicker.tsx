import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command";
import useLayoutEffect from "@/hooks/useLayoutEffect";
import { mergeRefs } from "@/utils";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef,
  useState,
} from "react";
import useFloatingBox from "../useFloatingBox";

export type CommandItemProps = Omit<
  ComponentPropsWithoutRef<typeof CommandItem>,
  "value"
> & {
  /**
   * Space separated keywords to match against the query.
   */
  keywords: string;
  /**
   * The icon to display.
   */
  icon: React.ReactNode;
  /**
   * The label to display.
   */
  label: string;
  /**
   * Called when the item is selected.
   */
  onSelect: ComponentPropsWithoutRef<typeof CommandItem>["onSelect"];
};

export type CommandPickerProps = PropsWithChildren<{
  /**
   * Use to filter commands
   */
  query: string;
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
}>;

const CommandPicker = forwardRef<HTMLDivElement, CommandPickerProps>(
  function CommandPicker({ children, query, container }, forwardedRef) {
    const [selectionRect, setSelectionRect] = useState<DOMRect>();

    const boxProps = useFloatingBox({
      position: selectionRect,
      anchor: container,
      offsetX: 10,
      offsetY: 10,
    });

    useLayoutEffect(() => {
      const nativeSelection = window.getSelection();
      if (nativeSelection) {
        setSelectionRect(nativeSelection.getRangeAt(0).getBoundingClientRect());
      }
    }, []);

    return (
      <Command
        ref={mergeRefs(forwardedRef, boxProps.ref)}
        label="Command Menu"
        className="absolute left-[var(--box-position-left)] top-[var(--box-position-top)] z-20 w-48
      border shadow-md duration-200 animate-in fade-in-0 zoom-in-95 dark:border-slate-600"
      >
        <CommandList>
          {/* HACK not working with value and onValueChange in Command */}
          <span className="hidden">
            <CommandInput value={query} />
          </span>
          <CommandEmpty>Command not found</CommandEmpty>
          {children}
        </CommandList>
      </Command>
    );
  },
);

const CommandPickerItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandPickerItem({ keywords, icon, label, ...rest }, ref) {
    return (
      <CommandItem {...rest} ref={ref} value={keywords}>
        <span className="inline-flex w-full items-center gap-2">
          {icon}
          {label}
        </span>
      </CommandItem>
    );
  },
);

export default CommandPicker;
export { CommandPickerItem };
