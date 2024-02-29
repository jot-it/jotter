import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { CgFile as FileIcon } from "react-icons/cg";
import { RiBook2Line as BookIcon } from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import { Item } from "./Item";
import SidebarItemList from "./ItemList";
import { MenuAction } from "./MenuAction";
import { ParentItem, sidebarState as initialItems } from "./state";

//#region  Typings
type EventHandlers = {
  /**
   * Callback when an item is selected (clicked)
   */
  onSelected?: (item: Item) => void;
  onNewPage?: (parent: ParentItem) => void;
  onNewCategory?: (parent: ParentItem) => void;
  onRename?: (item: Item, newLabel: string) => void;
  onDelete?: (parent: Item[], item: Item) => void;
};

export const EventHandlersContext = createContext<EventHandlers>({});

export type SidebarProps = PropsWithChildren<EventHandlers>;

function Sidebar({ children, ...eventHandlers }: SidebarProps) {
  const handlers = useMemo(() => eventHandlers, [eventHandlers]);
  return (
    <nav
      className="sticky top-0 z-20 flex h-screen flex-col justify-between space-y-1 
          bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
    >
      <EventHandlersContext.Provider value={handlers}>
        {children}
      </EventHandlersContext.Provider>
    </nav>
  );
}

export function SidebarRoot() {
  const { onNewPage, onNewCategory } = useContext(EventHandlersContext);
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <SidebarItemList items={initialItems} />
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={() => onNewPage?.(initialItems)}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={() => onNewCategory?.(initialItems)}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

export type SidebarButtonProps = React.ComponentPropsWithoutRef<"button">;

export function SidebarButton({ children, ...props }: SidebarButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg p-3 ring-cyan-600 hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 dark:hover:bg-gray-700"
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarDivider() {
  return <hr className="h-0.5 w-full border-gray-300 dark:border-slate-700" />;
}

export default Sidebar;
