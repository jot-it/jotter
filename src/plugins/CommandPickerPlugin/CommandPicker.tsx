import clsx from "clsx";
import {
  Dispatch,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Command } from "cmdk";
import { CommandPickeContext } from ".";

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
}>;

function CommandPicker({ children, show}: CommandPickerProps) {
  const command = useContext(CommandPickeContext);
  const [search, setSearch] = useState(command);
  
  useEffect(()=>{
    setSearch(command);
  },[command])

  if (!show) {
    return null;
  }

  return (
    <Command label="Command Menu">
      <Command.List className="absolute left-[460px] top-40 max-h-[30vh] min-w-[180px] flex-1 overflow-auto rounded-lg border bg-white p-1 text-gray-700  shadow-md  data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in dark:border-slate-600 dark:bg-slate-700 dark:text-inherit">
      {/* HACK not working with value and onValueChange in Command */}
      <Command.Input className="hidden" value={search} onValueChange={setSearch}/>
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
