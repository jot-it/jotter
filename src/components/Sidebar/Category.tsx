import useToggle from "@/hooks/useToggle";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { useSnapshot } from "valtio";
import ContextMenu from "../ContextMenu";
import {
  BookIcon,
  ChevronIcon,
  DeleteIcon,
  FileIcon,
  RenameIcon,
} from "../Icons";
import EditableLabel, { EditableLabelProps } from "./EditableLabel";
import { CategoryItem, Item, ItemWithParent, itemVariant } from "./Item";
import SidebarItemList from "./ItemList";
import { MenuAction } from "./MenuAction";
import { EventHandlersContext } from "./Sidebar";

export type CategoryProps = {
  category: CategoryItem;
} & Pick<EditableLabelProps, "editable" | "onRename" | "onReset">;

export type CategoryMenuProps = ItemWithParent<
  Pick<CategoryProps, "category"> & {
    /**
     * Open the accordion item with the given id
     */
    setOpen: (id: string) => void;

    onNewPage(category: CategoryItem): void;
    onNewCategory(category: CategoryItem): void;
    onRename(category: CategoryItem, newLabel: string): void;
    onDelete(parent: Item[], category: CategoryItem): void;
  }
>;

function CategoryWithMenu({
  setOpen,
  category,
  parent,
  onNewPage,
  onDelete,
  onNewCategory,
  onRename,
}: CategoryMenuProps) {
  const snap = useSnapshot(category);
  const [editable, toggleEditable] = useToggle(snap.isNew);

  const withExpand = (fn: () => void) => {
    return () => {
      fn();
      setOpen(category.id);
    };
  };

  const handleRename = (newLabel: string) => {
    onRename(category, newLabel);
    toggleEditable();
  };

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Category
          category={category}
          editable={editable}
          onRename={handleRename}
          onReset={toggleEditable}
        />
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={withExpand(() => onNewPage(category))}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={withExpand(() => onNewCategory(category))}
        />
        <ContextMenu.Divider />
        <MenuAction
          icon={<RenameIcon />}
          label="rename"
          onClick={toggleEditable}
        />
        <MenuAction
          icon={<DeleteIcon />}
          label="delete"
          onClick={() => onDelete(parent, category)}
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

function Category({ category, editable, onRename, onReset }: CategoryProps) {
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
              editable={editable}
              onRename={onRename}
              onReset={onReset}
            />
          </div>
          <ChevronIcon
            className="group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={category.items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default CategoryWithMenu;
