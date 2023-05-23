import * as Accordion from "@radix-ui/react-accordion";
import NextLink from "next/link";
import {
  RiAddLine as AddIcon,
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import Typography from "./Typography";

//#region  Typings
type SidebarItemListProps = {
  items: ItemProps[];
};

type SidebarProps = React.ComponentPropsWithoutRef<"aside">;

export type LinkProps = {
  type: "link";
  href: string;
  label: string;
};

export type CategoryProps = {
  type: "category";
  label: string;
  items: ItemProps[];
};

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export type ItemProps = CategoryProps | LinkProps;
//#endregion
function Sidebar({ children, ...rest }: SidebarProps) {
  return (
    <nav
      className="flex flex-col justify-between space-y-1 bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-gray-800 dark:text-inherit"
      {...rest}
    >
      {children}
    </nav>
  );
}

function SidebarItemList({ items }: SidebarItemListProps) {
  return (
    <Accordion.Root type="single" collapsible aria-multiselectable="false">
      {items.map((props, index) => (
        // TODO: generate a unique key for each item
        <Sidebar.Item key={index} {...props} />
      ))}
    </Accordion.Root>
  );
}

function SidebarItem(props: ItemProps) {
  switch (props.type) {
    case "category":
      return <Category {...props} />;
    case "link":
      return <Link {...props} />;
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

//NOTE: Maybe convert the Button in component with Variant = ADD | EXPORT | CONFIG
function AddButton(props: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      <Typography>ADD NEW PAGE</Typography>
      <AddIcon />
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
        <Sidebar.ItemList items={items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

Sidebar.Item = SidebarItem;
Sidebar.ItemList = SidebarItemList;
Sidebar.AddButton = AddButton;
Sidebar.Divider = Divider;

export default Sidebar;
