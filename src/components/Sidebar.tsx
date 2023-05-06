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
      className="flex flex-col justify-between space-y-1 bg-gray-200 px-4 py-12"
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
<<<<<<< HEAD:src/components/Sidebar.tsx
        className="block rounded-lg px-2 py-3 text-gray-800 hover:bg-gray-300 aria-[selected=true]:bg-gray-100"
=======
        className="rounded-lg px-2 py-3 text-gray-800 hover:bg-gray-300 aria-[selected=true]:bg-gray-100"
>>>>>>> main:components/Sidebar.tsx
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
      className="flex w-full items-center justify-between rounded-lg p-3 text-gray-800 hover:bg-gray-300"
    >
      <Typography>ADD NEW PAGE</Typography>
      <AddIcon />
    </button>
  );
}

function Divider() {
  return <hr className="divider h-0.5 w-full rounded-full bg-gray-300"></hr>;
}

function Category({ items, label }: CategoryProps) {
  return (
    <Accordion.Item value={label}>
<<<<<<< HEAD:src/components/Sidebar.tsx
      <Accordion.Header className="p-[2px]">
        <Accordion.Trigger
          className="group flex w-full items-center justify-between rounded-lg p-3 
        text-left text-gray-800 hover:bg-gray-300"
        >
=======
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between rounded-lg p-3 text-left text-gray-800 hover:bg-gray-300">
>>>>>>> main:components/Sidebar.tsx
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
