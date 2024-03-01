import useToggle from "@/hooks/useToggle";
import { registerShortcuts } from "@/lib/hotkeys";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { KeyboardEventHandler, useState } from "react";
import { useSnapshot } from "valtio";
import ContextMenu from "../ContextMenu";
import { DeleteIcon, RenameIcon } from "../Icons";
import Typography from "../Typography";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EditableLabel, { EditableLabelProps } from "./EditableLabel";
import { ItemWithParent, LinkItem, itemVariant } from "./Item";
import { MenuAction } from "./MenuAction";
import { EventHandlers, useSidebarEvents } from "./Sidebar";
import { withDeleteItemShortcut, withRenameItemShortcut } from "./shorcuts";
import { removeItem } from "./state";

export type LinkProps = {
  link: LinkItem;
  onKeyDown?: KeyboardEventHandler;
  onSelected: EventHandlers["onSelected"];
} & Pick<EditableLabelProps, "editable" | "onRename" | "onReset">;

export type LinkMenuProps = ItemWithParent<Pick<LinkProps, "link">>;

function LinkWithMenu({ link, parent }: LinkMenuProps) {
  const snap = useSnapshot(link);
  const [editable, toggleEditable] = useToggle(snap.isNew);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { onDelete, onRename, onSelected } = useSidebarEvents();

  const handleRename = (newLabel: string) => {
    onRename?.(link, newLabel);
    toggleEditable();
  };

  const handleReset = () => {
    // Delete when empty label
    if (!snap.label.length) {
      removeItem(parent, link);
    } else {
      toggleEditable();
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteAlertOpen(true);
  };

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Link
          link={link}
          editable={editable}
          onSelected={onSelected}
          onRename={handleRename}
          onReset={handleReset}
          onKeyDown={registerShortcuts(
            withRenameItemShortcut(toggleEditable),
            withDeleteItemShortcut(handleDeleteClick),
          )}
        />
      </ContextMenu.Trigger>
      <DeleteConfirmationDialog
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={() => onDelete?.(parent, link)}
      />
      <ContextMenu.Content>
        <MenuAction
          icon={<RenameIcon />}
          label="Rename..."
          onClick={toggleEditable}
          shortcut="F2"
        />
        <MenuAction
          icon={<DeleteIcon />}
          label="delete"
          onClick={handleDeleteClick}
          shortcut="Del"
        />
      </ContextMenu.Content>
    </ContextMenu>
  );
}

function Link({
  link,
  editable,
  onRename,
  onReset,
  onKeyDown,
  onSelected,
}: LinkProps) {
  const snap = useSnapshot(link);
  const isActive = usePathname() === snap.href;

  return (
    /* @ts-expect-error Next.js links also have a "as" prop */
    <Typography
      as={NextLink}
      variant="body1"
      href={snap.href}
      aria-current={isActive ? "page" : undefined}
      data-testid="sidebar-item"
      className={clsx(
        "block",
        itemVariant.root,
        isActive ? itemVariant.active : itemVariant.inactive,
      )}
      onClick={() => onSelected?.(link)}
      onKeyDown={onKeyDown}
    >
      <EditableLabel
        initialLabel={snap.label}
        editable={editable}
        onRename={onRename}
        onReset={onReset}
      />
    </Typography>
  );
}

export default LinkWithMenu;
