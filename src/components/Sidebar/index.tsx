import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import NextLink from "next/link";
import {
  KeyboardEvent,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import Typography from "../Typography";
import {
  SidebarDispatchContext,
  SidebarItemsContext,
  useSidebarDispatch,
  useSidebarItems,
} from "./context";
import { CategoryActions, LinksActions, SidebarActions } from "./menu-actions";
import { itemsReducer } from "./state";

//#region  Typings
export type SidebarItemListProps = {
  items: Item[];
};

type SidebarItemBaseProps = {
  isEditing?: boolean;
};

type CategoryBodyProps = Pick<CategoryProps, "label" | "items" | "id">;

export type SidebarProps = React.ComponentPropsWithoutRef<"aside"> &
  SidebarItemListProps;

export type LinkItem = {
  type: "link";
  href: string;
  label: string;
  id: string;
};

export type CategoryItem = {
  type: "category";
  label: string;
  items: Item[];
  id: string;
};

export type LinkProps = LinkItem & SidebarItemBaseProps;
export type CategoryProps = CategoryItem & SidebarItemBaseProps;
export type ButtonProps = React.ComponentPropsWithoutRef<"button">;
export type Item = CategoryItem | LinkItem;
export type ItemProps = CategoryProps | LinkProps;

//#endregion

function Sidebar({ children, items: initialItems, ...rest }: SidebarProps) {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);
  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatch}>
        <nav
          className="sticky top-0 flex h-screen flex-col justify-between space-y-1 
          bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
          {...rest}
        >
          {children}
        </nav>
      </SidebarDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
}

/**
 * Entry point for all sidebar items
 */
//#region Sidebar Arquitect
function SidebarItemsRoot() {
  const items = useSidebarItems();
  return (
    <div className="flex-1 overflow-auto">
      <ContextMenu trigger={<SidebarItemList items={items} />}>
        <SidebarActions />
      </ContextMenu>
    </div>
  );
}

function SidebarItemList({ items }: SidebarItemListProps) {
  return (
    <Accordion.Root className="h-full" type="single" collapsible>
      {items.map((props) => (
        <SidebarItem isEditing={false} key={props.id} {...props} />
      ))}
    </Accordion.Root>
  );
}

function SidebarItem(props: ItemProps) {
  const id = props.id;
  switch (props.type) {
    case "category":
      return (
        <ContextMenu trigger={<Category {...props} />}>
          <CategoryActions id={id} />
        </ContextMenu>
      );
    case "link":
      return (
        <ContextMenu trigger={<Link {...props} />}>
          <LinksActions id={id} />
        </ContextMenu>
      );
  }
}
//#endregion

export function Category({ ...props }: CategoryProps) {
  const { label, items, id } = props;

  return (
    <CategoryBody id={id} items={items} label={label}>
      <div>
        <BookIcon className="mr-2 inline-block" />
        <ItemContent {...props} />
      </div>
    </CategoryBody>
  );
}

export function Link({ ...props }: LinkProps) {
  const { href } = props;

  return (
    <NextLink href={href}>
      <Typography
        className={clsx(
          // isEmpty && "outline outline-1 -outline-offset-1 dark:outline-red-400",
          "block rounded-lg px-2 py-3 hover:bg-gray-300 focus-within:dark:bg-slate-700 dark:hover:bg-slate-700"
        )}
        variant="body1"
        aria-selected="false"
      >
        <ItemContent {...props} />
      </Typography>
    </NextLink>
  );
}

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

//#region Items Content
function ItemContent({ ...props }: ItemProps) {
  const { label: initialLabel, isEditing, id, type } = props;

  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEmpty = label.trim().length === 0;
  const dispatch = useSidebarDispatch();

  const handleRename = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      rename();
    }
    // Prevent category from opening when the users presses space bar
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const rename = () => {
    //Empty labels are assumed to be new
    if (isEmpty && initialLabel === "") {
      dispatch({ type: "delete", id });
      return;
    }

    //Prevent empty label
    if (isEmpty) {
      setLabel(initialLabel);
    }
    dispatch({ type: "rename", id, isEditing: false, newLabel: label });
  };

  useEffect(() => {
    // Prevent race condition between any active focus and this one
    const timeout = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(timeout);
  }, [isEditing]);

  const content = isEditing ? (
    <input
      className={clsx(
        type === "link" && "w-full",
        "cursor-text bg-transparent outline-none dark:bg-transparent dark:outline-none"
      )}
      placeholder={label}
      ref={inputRef}
      onBlur={rename}
      autoComplete="off"
      spellCheck={false}
      onChange={(e) => {
        setLabel(e.target.value);
      }}
      onKeyUp={handleRename}
    />
  ) : (
    <span>{label}</span>
  );

  return content;
}

function CategoryBody({ ...props }: PropsWithChildren<CategoryBodyProps>) {
  const { children, items, id } = props;
  return (
    <Accordion.Item value={id}>
      <Accordion.Header className="p-[2px]">
        <Accordion.Trigger
          className="group flex w-full items-center justify-between rounded-lg p-3 text-left 
          hover:bg-gray-300 data-[state=open]:bg-cyan-400/20 data-[state=open]:text-cyan-950
          dark:hover:bg-gray-700 dark:data-[state=open]:bg-cyan-900 dark:data-[state=open]:text-cyan-200"
        >
          {children}
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}
//#endregion

Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItemsRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
