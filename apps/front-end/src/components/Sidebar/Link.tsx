import useToggle from "@/hooks/useToggle";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { useSnapshot } from "valtio";
import ContextMenu from "../ContextMenu";
import { DeleteIcon, RenameIcon } from "../Icons";
import Typography from "../Typography";
import EditableLabel, { EditableLabelProps } from "./EditableLabel";
import { ItemWithParent, LinkItem, itemVariant } from "./Item";
import { MenuAction } from "./MenuAction";
import { EventHandlersContext } from "./Sidebar";
import { removeItem } from "./state";
import DeleteNoteConfirmation from "./DeleteDialog";

export type LinkProps = {
  link: LinkItem;
} & Pick<EditableLabelProps, "editable" | "onRename" | "onReset">;

export type LinkMenuProps = ItemWithParent<Pick<LinkProps, "link">>;

function LinkWithMenu({ link, parent }: LinkMenuProps) {
  const snap = useSnapshot(link);
  const [editable, toggleEditable] = useToggle(snap.isNew);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { onDelete, onRename } = useContext(EventHandlersContext);

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

  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <Link
          link={link}
          editable={editable}
          onRename={handleRename}
          onReset={handleReset}
        />
      </ContextMenu.Trigger>
      <DeleteNoteConfirmation
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={() => onDelete?.(parent, link)}
      />
      <ContextMenu.Content>
        <MenuAction
          icon={<RenameIcon />}
          label="Rename"
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

function Link({ link, onRename, onReset, editable }: LinkProps) {
  const eventHandlers = useContext(EventHandlersContext);
  const snap = useSnapshot(link);
  const isActive = usePathname() === snap.href;

  const handleClick = () => {
    eventHandlers.onSelected?.(link);
  };

  return (
    /* @ts-expect-error Next.js links also have a "as" prop */
    <Typography
      as={NextLink}
      variant="body1"
      href={snap.href}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      data-testid="sidebar-item"
      className={clsx(
        "block",
        itemVariant.root,
        isActive ? itemVariant.active : itemVariant.inactive,
      )}
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
