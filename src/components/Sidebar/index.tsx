import * as Accordion from "@radix-ui/react-accordion";
import NextLink from "next/link";
import {
  CgTrashEmpty as DeleteIcon,
  CgFile as FileIcon,
  CgInfo as InfoIcon,
  CgRename as RenameIcon,
} from "react-icons/cg";
import {
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import {
  SidebarDispatchContext,
  SidebarItemsContext,
  useSidebarDispatch,
  useSidebarItems,
} from "./context";
import { useReducer } from "react";
import { itemsReducer } from "./state";
import Typography from "../Typography";

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
  id: number;
};

export type CategoryProps = {
  type: "category";
  label: string;
  items: ItemProps[];
  id: number;
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
  const dispatch = useSidebarDispatch();

  switch (props.type) {
    case "category":
      return (
        <ContextMenu>
          <Category {...props} />
          <ContextMenu.Body>
            <ContextMenu.Option
              onClick={() => {
                dispatch({
                  type: "insert",
                  id: props.id,
                  itemType: "link",
                });
              }}
            >
              <FileIcon className="mr-3 text-lg  " />
              Add new page
            </ContextMenu.Option>
            <ContextMenu.Divider />

            <ContextMenu.Option
              onClick={() => {
                dispatch({
                  type: "rename",
                  newLabel: "rename category",
                  id: props.id,
                });
              }}
            >
              <RenameIcon className="mr-3 text-lg" />
              Rename
            </ContextMenu.Option>

            <ContextMenu.Option
              className="text-rose-800 data-[highlighted]:bg-rose-100"
              onClick={() => {
                dispatch({ type: "delete", id: props.id });
              }}
            >
              <DeleteIcon className="mr-3 text-lg" />
              Delete
            </ContextMenu.Option>
          </ContextMenu.Body>
        </ContextMenu>
      );
    case "link":
      return (
        <ContextMenu>
          <Link {...props} />
          <ContextMenu.Body>
            {/* TODO: Create separete function to LinkOptions and CategoryOptions */}
            <ContextMenu.Option
              onClick={() => {
                dispatch({ type: "group", id: props.id });
              }}
            >
              <BookIcon className="mr-3 text-lg" />
              <span>Group</span>
            </ContextMenu.Option>
            <ContextMenu.Divider />
            <ContextMenu.Option
              onClick={() => {
                dispatch({
                  type: "rename",
                  newLabel: "rename item",
                  id: props.id,
                });
              }}
            >
              <RenameIcon className="mr-3 text-lg" />
              <span>Rename</span>
            </ContextMenu.Option>
            <ContextMenu.Option
              className="text-rose-800 data-[highlighted]:bg-rose-100"
              onClick={() => {
                dispatch({ type: "delete", id: props.id });
              }}
            >
              <DeleteIcon className="mr-3 text-lg " />
              <span>Delete</span>
            </ContextMenu.Option>
            <ContextMenu.Option disabled={true}>
              <InfoIcon className="mr-3 text-lg " />
              {"Id: " + props.id}
            </ContextMenu.Option>
          </ContextMenu.Body>
        </ContextMenu>
      );
  }
}

function Link(props: LinkProps) {
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
  return <hr className="h-0.5 w-full border-gray-300 dark:border-gray-700" />;
}

function Category({ items, label }: CategoryProps) {
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

Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItemsRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
