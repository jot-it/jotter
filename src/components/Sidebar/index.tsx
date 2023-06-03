import * as Accordion from "@radix-ui/react-accordion";
import NextLink from "next/link";
import { useReducer } from "react";
import {
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import Typography from "../Typography";
import {
  SidebarDispatchContext,
  SidebarItemsContext,
  useSidebarItems,
} from "./context";
import { itemsReducer } from "./state";
import { CategoryOptions, LinksOptions } from "./optionsContexMenu";

//#region  Typings

export type SidebarItemListProps = {
  items: ItemProps[];
};

export type SidebarProps = React.ComponentPropsWithoutRef<"aside"> &
  SidebarItemListProps;

export type LinkProps = {
  type: "link";
  href: string;
  label: string;
  id: string;
};

export type CategoryProps = {
  type: "category";
  label: string;
  items: ItemProps[];
  id: string;
};

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export type ItemProps = CategoryProps | LinkProps;

//#endregion

function Sidebar({ children, items: initialItems, ...rest }: SidebarProps) {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);
  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarDispatchContext.Provider value={dispatch}>
        <nav
          className="flex flex-col justify-between space-y-1 bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
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
  return <SidebarItemList items={items} />;
}

function SidebarItemList({ items }: SidebarItemListProps) {
  return (
    <Accordion.Root type="single" collapsible>
      {items.map((props) => (
        <Sidebar.Item key={props.id} {...props} />
      ))}
    </Accordion.Root>
  );
}

function SidebarItem(props: ItemProps) {
  switch (props.type) {
    case "category":
      return (
        <ContextMenu item={props}>
          <CategoryOptions {...props} />
        </ContextMenu>
      );
    case "link":
      return (
        <ContextMenu item={props}>
          <LinksOptions {...props} />
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

export function Link(props: LinkProps) {
  const { href, label } = props;
  return (
    <NextLink href={href}>
      <Typography
        className="block rounded-lg px-2 py-3 hover:bg-gray-300 dark:hover:bg-gray-700"
        variant="body1"
        aria-selected="false"
      >
        {label}
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
