import { Command } from "cmdk";
import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import useFloatingBox from "../useFloatingBox";

export type CommandItemProps = PropsWithChildren<{
  /**
   * String separate by space use to filter by `queryString`
   */
  keywords: string;

  onClick: MouseEventHandler;
}>;

export type CommandPickerProps = PropsWithChildren<{
  /**
   * Use to show it
   */
  show: boolean;
  /**
   * Use to filter commands
   */
  query: string;
  /**
   * The container surrounding the editor.
   */
  container: HTMLDivElement;
}>;

function CommandPicker({
  children,
  query,
  container,
  show,
}: CommandPickerProps) {
  const [selectionRect, setSelectionRect] = useState<DOMRect>();

  const boxProps = useFloatingBox({
    position: selectionRect,
    anchor: container,
    offsetX: 10,
    offsetY: 10,
  });

  useEffect(() => {
    const nativeSelection = window.getSelection();
    if (nativeSelection && nativeSelection.rangeCount != 0) {
      setSelectionRect(nativeSelection.getRangeAt(0).getBoundingClientRect());
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <Command
      ref={boxProps.ref}
      label="Command Menu"
      className="absolute left-0 top-0 z-20 max-h-[30vh] min-w-[180px] flex-1 overflow-auto rounded-lg border bg-white p-1 text-gray-700  shadow-md  data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in dark:border-slate-600 dark:bg-slate-700 dark:text-inherit"
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
}

function CommandItem({ children, keywords, onClick }: CommandItemProps) {
  return (
    <Command.Item
      value={keywords}
      key={keywords}
      className="cursor-pointer rounded-md px-2 py-1 text-base hover:bg-gray-200 dark:hover:bg-cyan-800 dark:hover:text-cyan-300"
    >
      <button
        type="button"
        role="menuitem"
        className="inline-flex w-full items-center gap-2"
        onClick={onClick}
      >
        {children}
      </button>
    </Command.Item>
  );
}

export default Object.assign(CommandPicker, { Command: CommandItem });
