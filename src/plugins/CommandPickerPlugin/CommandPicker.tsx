import useLayoutEffect from "@/hooks/useLayoutEffect";
import { mergeRefs } from "@/utils";
import { Command } from "cmdk";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef,
  useState,
} from "react";
import useFloatingBox from "../useFloatingBox";

export type CommandItemProps = {
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
  onSelect: ComponentPropsWithoutRef<typeof Command.Item>["onSelect"];
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
        className="absolute left-0 top-0 z-20 max-h-[30vh] min-w-[180px] flex-1 overflow-auto rounded-lg border
       bg-white p-1 text-gray-700  shadow-md  data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in
        dark:border-slate-600 dark:bg-slate-700 dark:text-inherit"
      >
        <Command.List>
          {/* HACK not working with value and onValueChange in Command */}
          <Command.Input className="hidden" value={query} />
          <Command.Empty className=" px-2 py-1 text-base">
            Command not found
          </Command.Empty>
          {children}
        </Command.List>
      </Command>
    );
  },
);

const CommandPickerItem = forwardRef<HTMLDivElement, CommandItemProps>(
  function CommandPickerItem({ keywords, icon, label, ...rest }, ref) {
    return (
      <Command.Item
        {...rest}
        ref={ref}
        value={keywords}
        className="cursor-pointer rounded-md px-2 py-1 text-base aria-[selected=true]:bg-cyan-200
      dark:aria-[selected=true]:bg-cyan-800 dark:aria-[selected=true]:text-cyan-300
      "
      >
        <span className="inline-flex w-full items-center gap-2">
          {icon}
          {label}
        </span>
      </Command.Item>
    );
  },
);

export default CommandPicker;
export { CommandPickerItem };
