import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  CgTrashEmpty as DeleteIcon,
  CgFile as FileIcon,
  CgRename as RenameIcon,
} from "react-icons/cg";
import {
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import Typography from "../Typography";
import EditableLabel, { EditableLabelProps } from "./EditableLabel";
import { MenuAction } from "./MenuAction";
import { Action, useSidebarReducer } from "./state";
import { BreadcrumbItem } from "../Breadcrumbs";

//#region  Typings
type SidebarItemBaseProps = Pick<
  EditableLabelProps,
  "editable" | "onRename" | "onReset"
>;

type EventHandlers = {
  /**
   * Callback when an item is selected (clicked)
   */
  onSelected?: (item: Item) => void;
};

type ItemBase = {
  href: string;
  /**
   * Label to display
   */
  label: string;
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Enasble editing of the label
   */
  editable?: boolean;
  /**
   * Path to this item relative to the root of the sidebar
   */
  crumbs: BreadcrumbItem[];
};

export type LinkItem = ItemBase & {
  type: "link";
};

export type CategoryItem = ItemBase & {
  type: "category";
  items: Item[];
};

export type Item = CategoryItem | LinkItem;
//#endregion

const itemVariant = {
  root: "rounded-lg p-3 text-left",
  active:
    "dark:bg-cyan-900 bg-cyan-400/20  dark:text-cyan-200 text-cyan-950 dark:hover:bg-cyan-800\
     hover:bg-gray-300 hover:bg-cyan-400/30",
  inactive:
    "hover:bg-gray-300 dark:hover:bg-slate-700\
    focus-within:dark:bg-slate-700 focus-within:bg-gray-300",
} as const;

// Default to empty dispatch when there is not an immediate parent
const noop = () => {};
const DispatchContext = createContext<Dispatch<Action>>(noop);

const EventHandlersContext = createContext<EventHandlers | null>(null);

export type SidebarProps = PropsWithChildren;
function Sidebar({ children }: SidebarProps) {
  return (
    <nav
      className="sticky top-0 z-20 flex h-screen flex-col justify-between space-y-1 
          bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
    >
      {children}
    </nav>
  );
}

export type SidebarRootProps = SidebarItemListProps &
  EventHandlers & {
    /**
     * dispatch from useSidebarReducer()
     */
    dispatch: Dispatch<Action>;
  };

function SidebarRoot({ items, dispatch, onSelected }: SidebarRootProps) {
  const eventHandlers = useMemo(() => {
    return { onSelected };
  }, [onSelected]);
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <DispatchContext.Provider value={dispatch}>
          <EventHandlersContext.Provider value={eventHandlers}>
            <SidebarItemList items={items} />
          </EventHandlersContext.Provider>
        </DispatchContext.Provider>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={() => dispatch({ type: "add_item", itemType: "link" })}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={() => dispatch({ type: "add_item", itemType: "category" })}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

export type SidebarItemListProps = {
  items: Item[];
};

function SidebarItemList({ items }: SidebarItemListProps) {
  const [value, setValue] = useState<string[]>([]);
  const setOpen = (id: string) => {
    setValue((prev) => [...prev, id]);
  };

  return (
    <Accordion.Root
      className="h-full"
      type="multiple"
      value={value}
      onValueChange={(values) => setValue(values)}
      data-testid="sidebar-item-list"
    >
      {items.map((props) => {
        switch (props.type) {
          case "category":
            return <CategoryWithMenu {...props} setOpen={setOpen} />;
          case "link":
            return <LinkWithMenu {...props} />;
        }
      })}
    </Accordion.Root>
  );
}

export type CategoryMenuProps = CategoryProps & {
  /**
   * Open the accordion item with the given id
   */
  setOpen: (id: string) => void;
};

function CategoryWithMenu({
  items: initialItems,
  editable: editable,
  setOpen,
  ...rest
}: CategoryMenuProps) {
  const parentDispatch = useContext(DispatchContext);
  const [items, dispatch] = useSidebarReducer(initialItems);

  const withExpand = (fn: () => void) => {
    return () => {
      fn();
      setOpen(rest.id);
    };
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <ContextMenu>
        <ContextMenu.Trigger>
          <Category
            {...rest}
            items={items}
            editable={editable}
            onRename={(label) =>
              parentDispatch({ type: "rename", id: rest.id, label })
            }
            onReset={() =>
              dispatch({ type: "edit_mode", id: rest.id, value: false })
            }
          />
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <MenuAction
            icon={<FileIcon />}
            label="new page"
            onClick={withExpand(() =>
              dispatch({ type: "add_item", itemType: "link" }),
            )}
          />
          <MenuAction
            icon={<BookIcon />}
            label="new category"
            onClick={withExpand(() =>
              dispatch({ type: "add_item", itemType: "category" }),
            )}
          />
          <ContextMenu.Divider />
          <MenuAction
            icon={<RenameIcon />}
            label="rename"
            onClick={() =>
              parentDispatch({ type: "edit_mode", id: rest.id, value: true })
            }
          />
          <MenuAction
            icon={<DeleteIcon />}
            label="delete"
            onClick={() => parentDispatch({ type: "delete", id: rest.id })}
          />
        </ContextMenu.Content>
      </ContextMenu>
    </DispatchContext.Provider>
  );
}

export type CategoryProps = CategoryItem & SidebarItemBaseProps;

function Category(props: CategoryProps) {
  const router = useRouter();
  const eventHandlers = useContext(EventHandlersContext);
  const isActive = usePathname() === props.href;

  const itemsWithBreadcrumbs = props.items.map((item) => {
    const ownBreadcrumbs = props.crumbs;
    return {
      ...item,
      crumbs: ownBreadcrumbs.concat(item.crumbs),
    };
  });

  const handleClick = () => {
    eventHandlers?.onSelected?.(props);
    router.push(props.href);
  };

  return (
    <Accordion.Item value={props.id}>
      <Accordion.Header className="p-0.5">
        <Accordion.Trigger
          data-testid="sidebar-item"
          onClick={handleClick}
          className={clsx(
            itemVariant.root,
            isActive ? itemVariant.active : itemVariant.inactive,
            "group flex w-full items-center justify-between",
          )}
        >
          <div>
            <BookIcon className="mr-2 inline-block" />
            <EditableLabel
              initialLabel={props.label}
              editable={props.editable}
              onRename={props.onRename}
              onReset={props.onReset}
            />
          </div>
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={itemsWithBreadcrumbs} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

function LinkWithMenu(props: LinkProps) {
  const dispatch = useContext(DispatchContext);
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        {/* FIXME Link doesn't use dispatch. It should not receive it as prop */}
        <Link
          {...props}
          onRename={(label) =>
            dispatch({ type: "rename", id: props.id, label })
          }
          onReset={() =>
            dispatch({ type: "edit_mode", id: props.id, value: false })
          }
        />
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <MenuAction
          icon={<RenameIcon />}
          label="Rename"
          onClick={() =>
            dispatch({ type: "edit_mode", id: props.id, value: true })
          }
        />
        <MenuAction
          icon={<DeleteIcon />}
          label="delete"
          onClick={() => dispatch({ type: "delete", id: props.id })}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

export type LinkProps = LinkItem & SidebarItemBaseProps;

function Link(props: LinkProps) {
  const eventHandlers = useContext(EventHandlersContext);
  const isActive = usePathname() === props.href;

  const handleClick = () => {
    eventHandlers?.onSelected?.(props);
  };
  return (
    /* @ts-expect-error Next.js links also have a "as" prop */
    <Typography
      as={NextLink}
      variant="body1"
      href={props.href}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      data-testid="sidebar-item"
      className={clsx(
        "block",
        itemVariant.root,
        isActive ? itemVariant.active : itemVariant.inactive,
      )}
    >
      <EditableLabel
        initialLabel={props.label}
        editable={props.editable}
        onRename={props.onRename}
        onReset={props.onReset}
      />
    </Typography>
  );
}

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-300 dark:hover:bg-gray-700"
      {...props}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <hr className="h-0.5 w-full border-gray-300 dark:border-slate-700" />;
}

Sidebar.Items = SidebarRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
