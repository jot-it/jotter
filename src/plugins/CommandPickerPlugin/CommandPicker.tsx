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
   * String separate by space use to filter by `queryString`
   */
  keywords: string;
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

function CommandPickerItem({ children, keywords, ...rest }: CommandItemProps) {
  return (
    <CommandItem value={keywords} {...rest}>
      <span className="inline-flex w-full items-center gap-2">{children}</span>
    </CommandItem>
  );
}

export default Object.assign(CommandPicker, { Command: CommandPickerItem });
