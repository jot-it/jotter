import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
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
import { useSnapshot } from "valtio";
import { BreadcrumbItem } from "../Breadcrumbs";
import ContextMenu from "../ContextMenu";
import Typography from "../Typography";
import EditableLabel, { EditableLabelProps } from "./EditableLabel";
import { MenuAction } from "./MenuAction";
import {
  sidebarState,
  newCategory,
  newPage,
  removeItem,
  setEditMode,
  setLabel,
} from "./state";

//#region  Typings
type SidebarItemBaseProps = Pick<EditableLabelProps, "onRename" | "onReset">;

type EventHandlers = {
  /**
   * Callback when an item is selected (clicked)
   */
  onSelected?: (item: DeepReadonly<Item>) => void;
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

type ParentItem = {
  parent: Item[];
};

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

const EventHandlersContext = createContext<EventHandlers>({});

export type SidebarProps = PropsWithChildren<EventHandlers>;
function Sidebar({ children, onSelected }: SidebarProps) {
  const eventHandlers = useMemo(() => {
    return { onSelected };
  }, [onSelected]);

  return (
    <nav
      className="sticky top-0 z-20 flex h-screen flex-col justify-between space-y-1 
          bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
    >
      <EventHandlersContext.Provider value={eventHandlers}>
        {children}
      </EventHandlersContext.Provider>
    </nav>
  );
}

function SidebarRoot() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <SidebarItemList items={sidebarState} />
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={() => newPage(sidebarState)}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={() => newCategory(sidebarState)}
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

  const snap = useSnapshot(items);
  return (
    <Accordion.Root
      className="h-full"
      type="multiple"
      value={value}
      onValueChange={(values) => setValue(values)}
      data-testid="sidebar-item-list"
    >
      {/* We need to pass down the actual item state proxy and not the snapshot
          to allow other components to modify the state.
      */}
      {snap.map(({ type, id }, i) => {
        switch (type) {
          case "category":
            return (
              <CategoryWithMenu
                category={items[i] as CategoryProps["category"]}
                parent={items}
                setOpen={setOpen}
                key={id}
              />
            );
          case "link":
            return (
              <LinkWithMenu
                link={items[i] as LinkProps["link"]}
                parent={items}
                key={id}
              />
            );
        }
      })}
    </Accordion.Root>
  );
}

export type CategoryMenuProps = ParentItem &
  CategoryProps & {
    /**
     * Open the accordion item with the given id
     */
    setOpen: (id: string) => void;
  };

function CategoryWithMenu({ setOpen, category, parent }: CategoryMenuProps) {
  const withExpand = (fn: () => void) => {
    return () => {
      fn();
      setOpen(category.id);
    };
  };

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Category category={category} />
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={withExpand(() => newPage(category.items, category.crumbs))}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={withExpand(() =>
            newCategory(category.items, category.crumbs),
          )}
        />
        <ContextMenu.Divider />
        <MenuAction
          icon={<RenameIcon />}
          label="rename"
          onClick={() => setEditMode(category, true)}
        />
        <MenuAction
          icon={<DeleteIcon />}
          label="delete"
          onClick={() => removeItem(parent, category)}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

export type CategoryProps = {
  category: CategoryItem & SidebarItemBaseProps;
};

function Category({ category }: CategoryProps) {
  const snap = useSnapshot(category);
  const router = useRouter();
  const eventHandlers = useContext(EventHandlersContext);
  const isActive = usePathname() === snap.href;

  const handleClick = () => {
    eventHandlers.onSelected?.(snap);
    router.push(snap.href);
  };

  return (
    <Accordion.Item value={snap.id}>
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
              initialLabel={snap.label}
              editable={snap.editable}
              onRename={(label) => setLabel(category, label)}
              onReset={() => setEditMode(category, false)}
            />
          </div>
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={category.items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

type LinkMenuProps = LinkProps & {
  parent: Item[];
};

function LinkWithMenu({ link, parent }: LinkMenuProps) {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Link link={link} />
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <MenuAction
          icon={<RenameIcon />}
          label="Rename"
          onClick={() => setEditMode(link, true)}
        />
        <MenuAction
          icon={<DeleteIcon />}
          label="delete"
          onClick={() => removeItem(parent, link)}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

export type LinkProps = { link: LinkItem & SidebarItemBaseProps };

function Link({ link }: LinkProps) {
  const eventHandlers = useContext(EventHandlersContext);
  const snap = useSnapshot(link);
  const isActive = usePathname() === snap.href;

  const handleClick = () => {
    eventHandlers.onSelected?.(snap);
  };

  return (
    /* @ts-expect-error Next.js links also have a "as" prop */
    <Typography
      as={NextLink}
      variant="body1"
      href={snap.href}
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
        initialLabel={snap.label}
        editable={snap.editable}
        onRename={(label) => setLabel(link, label)}
        onReset={() => setEditMode(link, false)}
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
