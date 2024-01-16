import useToggle from "@/hooks/useToggle";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
import { CategoryItem, ItemWithParent, itemVariant } from "./Item";
import SidebarItemList from "./ItemList";
import { MenuAction } from "./MenuAction";
import { EventHandlersContext } from "./Sidebar";
import { removeItem } from "./state";
import DeleteNoteConfirmation from "./DeleteDialog";

export type CategoryProps = {
  category: CategoryItem;
} & Pick<EditableLabelProps, "editable" | "onRename" | "onReset">;

export type CategoryMenuProps = ItemWithParent<
  Pick<CategoryProps, "category">
> & {
  setOpen(id: string): void;
};

function CategoryWithMenu({ setOpen, category, parent }: CategoryMenuProps) {
  const snap = useSnapshot(category);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { onNewPage, onDelete, onNewCategory, onRename } =
    useContext(EventHandlersContext);

  const [editable, toggleEditable] = useToggle(snap.isNew);

  const withExpand = (fn: () => void) => {
    return () => {
      fn();
      setOpen(category.id);
    };
  };

  const handleRename = (newLabel: string) => {
    onRename?.(category, newLabel);
    toggleEditable();
  };

  const handleReset = () => {
    // Delete when empty label
    if (!snap.label.length) {
      removeItem(parent, category);
    } else {
      toggleEditable();
    }
  };

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Category
          category={category}
          editable={editable}
          onRename={handleRename}
          onReset={handleReset}
        />
      </ContextMenu.Trigger>
      <DeleteNoteConfirmation
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={() => onDelete?.(parent, category)}
      />
      <ContextMenu.Content>
        <MenuAction
          icon={<FileIcon />}
          label="new page"
          onClick={withExpand(() => onNewPage?.(category))}
        />
        <MenuAction
          icon={<BookIcon />}
          label="new category"
          onClick={withExpand(() => onNewCategory?.(category))}
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
          onClick={() => setIsDeleteAlertOpen(true)}
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
    eventHandlers.onSelected?.(category);
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
