import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  KeyboardEvent,
  PropsWithChildren,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  RiBook2Line as BookIcon,
  RiArrowDownSLine as Chevron,
} from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import Typography from "../Typography";
import { useSidebarDispatch, useSidebarItems } from "./SidebarContextProvider";
import { CategoryActions, LinkActions, SidebarActions } from "./menu-actions";

//#region  Typings
export type SidebarItemListProps = {
  items: Item[];
};

type SidebarItemBaseProps = {
  isEditing?: boolean;
};

export type SidebarProps = PropsWithChildren;

export type LinkItem = {
  type: "link";
  href: string;
  label: string;
  id: string;
};

export type CategoryItem = {
  type: "category";
  href: string;
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

function Sidebar({ children }: PropsWithChildren) {
  return (
    <nav
      className="sticky top-0 z-20 flex h-screen flex-col justify-between space-y-1 
          bg-gray-200 px-4 py-12 font-medium text-gray-800 dark:bg-slate-800 dark:text-inherit"
    >
      {children}
    </nav>
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

// Memoize to prevent re-rendering when the user is renaming an item
const SidebarItemList = memo(function SidebarItemList({
  items,
}: SidebarItemListProps) {
  return (
    <Accordion.Root className="h-full" type="single" collapsible>
      {items.map((props) => (
        <SidebarItem key={props.id} {...props} />
      ))}
    </Accordion.Root>
  );
});

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
          <LinkActions id={id} />
        </ContextMenu>
      );
  }
}
//#endregion

export function Category(props: CategoryProps) {
  const router = useRouter();
  return (
    <Accordion.Item value={props.id}>
      <Accordion.Header className="p-0.5">
        <Accordion.Trigger
          onClick={() => router.push(props.href)}
          className="group flex w-full items-center justify-between rounded-lg p-3 text-left 
          hover:bg-gray-300 data-[state=open]:bg-cyan-400/20 data-[state=open]:text-cyan-950
          dark:hover:bg-gray-700 dark:data-[state=open]:bg-cyan-900 dark:data-[state=open]:text-cyan-200"
        >
          <div>
            <BookIcon className="mr-2 inline-block" />
            <ItemContent {...props} />
          </div>
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="ml-2">
        <SidebarItemList items={props.items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function Link(props: LinkProps) {
  const isActive = usePathname() === props.href;
  return (
    //@ts-expect-error Next.js links also have a "as" prop
    <Typography
      as={NextLink}
      href={props.href}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        // isEmpty && "outline outline-1 -outline-offset-1 dark:outline-red-400",
        isActive && "bg-gray-300 dark:bg-slate-700",
        "block rounded-lg px-2 py-3 hover:bg-gray-300 focus-within:bg-gray-300 focus-within:dark:bg-slate-700 dark:hover:bg-slate-700"
      )}
      variant="body1"
    >
      <ItemContent {...props} />
    </Typography>
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
function ItemContent(props: ItemProps) {
  const { label: initialLabel, isEditing, id, type } = props;
  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLabelEmpty = label.trim().length === 0;
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
    // Both initial label and current label are empty this must be a new item
    if (isLabelEmpty && initialLabel.length === 0) {
      dispatch({ type: "delete", id });
      return;
    }

    if (isLabelEmpty) {
      setLabel(initialLabel); // Reset label
    }

    dispatch({
      type: "rename",
      id,
      newLabel: isLabelEmpty ? initialLabel : label,
    });
  };

  useEffect(() => {
    // HACK Use a timeout to prevent race condition between any active focus and this one
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 200);
    return () => clearTimeout(timeout);
  }, [isEditing]);

  if (!isEditing) {
    return <span>{label}</span>;
  }

  return (
    <input
      className={clsx(
        type === "link" && "w-full",
        "cursor-text bg-transparent outline-none"
      )}
      autoComplete="off"
      value={label}
      spellCheck={false}
      ref={inputRef}
      onBlur={rename}
      onChange={(e) => setLabel(e.target.value)}
      onKeyUp={handleRename}
    />
  );
}
//#endregion

Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItemsRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
