import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import NextLink from "next/link";
import { KeyboardEvent, useEffect, useReducer, useRef, useState } from "react";
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
import { useOnOutsideClick as useOnOutsideClick } from "../../hooks/useOnOutsideClick";

//#region  Typings

export type SidebarItemListProps = {
  items: Item[];
};

type SidebarItemProps = {
  isEditing: boolean;
};

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

export type LinkProps = LinkItem & SidebarItemProps;
export type CategoryProps = CategoryItem & SidebarItemProps;
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
          className="flex max-h-screen flex-col justify-between space-y-1 bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
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

export function Category({ items, label }: CategoryProps) {
  return (
    <Accordion.Item value={label}>
      <Accordion.Header className="p-[2px]">
        <Accordion.Trigger
          className="group flex w-full items-center justify-between rounded-lg p-3 text-left 
         hover:bg-gray-300 data-[state=open]:bg-cyan-400/20 data-[state=open]:text-cyan-950
         dark:hover:bg-gray-700 dark:data-[state=open]:bg-cyan-900 dark:data-[state=open]:text-cyan-200"
        >
          <div>
            <BookIcon className="mr-2 inline-block" />
            {label}
          </div>
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function Link({ ...props }: LinkProps) {
  const { href, label: initialLabel, isEditing, id } = props;
  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEmpty = label.trim().length === 0;
  const dispatch = useSidebarDispatch();

  const handleRename = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      rename();
    }
  };

  const rename = () => {
    if (!isEmpty) {
      dispatch({ type: "rename", id, isEditing: false, newLabel: label });
    }
  };

  useOnOutsideClick(inputRef, rename);

  useEffect(() => {
    // Prevent race condition between any active focus and this one
    const timeout = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(timeout);
  }, [isEditing]);

  const content = isEditing ? (
    <input
      className="block w-full cursor-text bg-transparent outline-none dark:bg-transparent dark:outline-none"
      placeholder={label}
      ref={inputRef}
      autoComplete="off"
      onChange={(e) => {
        setLabel(e.target.value);
      }}
      onKeyUp={handleRename}
    />
  ) : (
    <span>{label}</span>
  );

  return (
    <NextLink href={href}>
      <Typography
        className={clsx(
          isEmpty && "outline outline-1 -outline-offset-1 dark:outline-red-400",
          "block rounded-lg px-2 py-3 hover:bg-gray-300 focus-within:dark:bg-slate-700 dark:hover:bg-slate-700"
        )}
        variant="body1"
        aria-selected="false"
      >
        {content}
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

Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItemsRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
