import useToggle from "@/hooks/useToggle";
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
import {
  DeleteItemAction,
  InsertItemAction,
  RenameAction,
  SidebarActions,
} from "./menu-actions";

//#region  Typings
export type SidebarItemListProps = {
  items: Item[];
};

type SidebarItemBaseProps = Pick<
  EditableLabelProps,
  "editable" | "onRename" | "onReset"
>;

export type SidebarProps = PropsWithChildren;

type EditableLabelProps = {
  id: ItemProps["id"];
  editable?: boolean;
  initialLabel: string;
  onRename?(label: string): void;
  onReset?(): void;
};

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
      <ContextMenu>
        <ContextMenu.Trigger>
          <SidebarItemList items={items} />
        </ContextMenu.Trigger>
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
    <Accordion.Root
      className="h-full"
      type="multiple"
      data-testid="sidebar-item-list"
    >
      {items.map((props) => (
        <SidebarItem key={props.id} {...props} />
      ))}
    </Accordion.Root>
  );
});

function SidebarItem(props: ItemProps) {
  const [editable, toggleEditable] = useToggle(props.editable);
  const dispatch = useSidebarDispatch();

  const handleRename = (label: string) => {
    dispatch({ type: "rename", id: props.id, newLabel: label });
    toggleEditable();
  };

  const handleReset = () => {
    if (!props.label.length) {
      dispatch({ type: "delete", id: props.id });
    }
    toggleEditable();
  };

  switch (props.type) {
    case "category":
      return (
        <ContextMenu>
          <ContextMenu.Trigger>
            <Category
              {...props}
              onRename={handleRename}
              onReset={handleReset}
            />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <InsertItemAction id={props.id} actionName="New page" type="link" />
            <InsertItemAction
              id={props.id}
              actionName="New category"
              type="category"
            />
            <ContextMenu.Divider />
            <RenameAction id={props.id} onClick={toggleEditable} />
            <DeleteItemAction id={props.id} />
          </ContextMenu.Content>
        </ContextMenu>
      );
    case "link":
      return (
        <ContextMenu>
          <ContextMenu.Trigger>
            <Link
              {...props}
              editable={editable}
              onRename={handleRename}
              onReset={handleReset}
            />
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <RenameAction id={props.id} onClick={toggleEditable} />
            <DeleteItemAction id={props.id} />
          </ContextMenu.Content>
        </ContextMenu>
      );
  }
}
//#endregion

export function Category({
  id,
  href,
  items,
  label,
  editable,
  onRename,
  onReset,
}: CategoryProps) {
  const router = useRouter();
  return (
    <Accordion.Item value={id}>
      <Accordion.Header className="p-0.5">
        <Accordion.Trigger
          data-testid="sidebar-item"
          onClick={() => router.push(href)}
          className="group flex w-full items-center justify-between rounded-lg p-3 text-left 
          hover:bg-gray-300 data-[state=open]:bg-cyan-400/20 data-[state=open]:text-cyan-950
          dark:hover:bg-gray-700 dark:data-[state=open]:bg-cyan-900 dark:data-[state=open]:text-cyan-200"
        >
          <div>
            <BookIcon className="mr-2 inline-block" />
            <EditableLabel
              id={id}
              initialLabel={label}
              editable={editable}
              onRename={onRename}
              onReset={onReset}
            />
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

export function Link({
  href,
  label,
  id,
  onRename,
  onReset,
  editable,
}: LinkProps) {
  const isActive = usePathname() === href;
  return (
    /* @ts-expect-error Next.js links also have a "as" prop */
    <Typography
      as={NextLink}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        // isEmpty && "outline outline-1 -outline-offset-1 dark:outline-red-400",
        isActive && "bg-gray-300 dark:bg-slate-700",
        "block rounded-lg px-2 py-3 hover:bg-gray-300 focus-within:bg-gray-300 focus-within:dark:bg-slate-700 dark:hover:bg-slate-700",
      )}
      variant="body1"
      data-testid="sidebar-item"
    >
      <EditableLabel
        id={id}
        initialLabel={label}
        editable={editable}
        onRename={onRename}
        onReset={onReset}
      />
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

function EditableLabel({
  initialLabel,
  editable,
  onRename,
  onReset,
}: EditableLabelProps) {
  const [label, setLabel] = useState(initialLabel);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLabelEmpty = label.trim().length === 0;

  const handleReset = () => {
    setLabel(initialLabel);
    onReset?.();
  };

  const handleRename = () => {
    onRename?.(label);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      if (isLabelEmpty) handleReset();
      else handleRename();
    } else if (e.key === "Escape") handleReset();
  };

  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel]);

  useEffect(() => {
    // HACK Use a timeout to prevent race condition between any active focus and this one
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 200);
    return () => clearTimeout(timeout);
  }, [editable]);

  if (!editable) {
    return <span>{initialLabel}</span>;
  }

  return (
    <input
      className="cursor-text bg-transparent outline-none"
      autoComplete="off"
      value={label}
      spellCheck={false}
      ref={inputRef}
      onBlur={handleRename}
      onChange={(e) => setLabel(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder="new note name..."
    />
  );
}

Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItemsRoot;
Sidebar.Button = Button;
Sidebar.Divider = Divider;

export default Sidebar;
