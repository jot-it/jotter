import {
  CgTrashEmpty as DeleteIcon,
  CgFile as FileIcon,
  CgInfo as InfoIcon,
  CgRename as RenameIcon,
} from "react-icons/cg";
import { RiBook2Line as BookIcon } from "react-icons/ri";
import { CategoryItem, ItemProps, LinkItem } from ".";
import ContextMenu from "../ContextMenu";
import { useSidebarDispatch } from "./context";

export function LinksOptions(props: LinkItem) {
  const dispatch = useSidebarDispatch();

  return (
    <ContextMenu.Content>
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
        onClick={(e) => {
          // Prevent executing whe user alse click outside
          e.nativeEvent.stopImmediatePropagation();
          dispatch({
            type: "rename",
            id: props.id,
            isEditing: true,
          });
        }}
      >
        <RenameIcon className="mr-3 text-lg" />
        <span>Rename</span>
      </ContextMenu.Option>
      <ContextMenu.Option
        className="text-rose-800 data-[highlighted]:bg-rose-200/75  dark:text-red-400 dark:data-[highlighted]:text-red-400"
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
    </ContextMenu.Content>
  );
}

export function CategoryOptions(props: CategoryItem) {
  
  const dispatch = useSidebarDispatch();

  return (
    <ContextMenu.Content>
      <ContextMenu.Option
        onClick={() => {
          const item: ItemProps = {
            label: "new item",
            id: crypto.randomUUID(),
            href: "#ni001",
            type: "link",
            isEditing : true,
          };

          dispatch({
            type: "insert",
            id: props.id,
            newItem: item,
          });
        }}
      >
        <FileIcon className="mr-3 text-lg" />
        Add new page
      </ContextMenu.Option>
      <ContextMenu.Divider />

      <ContextMenu.Option
        onClick={() => {
          dispatch({
            type: "rename",
            id: props.id,
            isEditing: true,
          });
        }}
      >
        <RenameIcon className="mr-3 text-lg" />
        Rename
      </ContextMenu.Option>

      <ContextMenu.Option
        className="text-rose-800 data-[highlighted]:bg-rose-200/75  dark:text-red-400 dark:data-[highlighted]:text-red-400"
        onClick={() => {
          dispatch({ type: "delete", id: props.id });
        }}
      >
        <DeleteIcon className="mr-3 text-lg" />
        Delete
      </ContextMenu.Option>
    </ContextMenu.Content>
  );
}

export function SidebarOption() {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Content>
      <ContextMenu.Option
        onClick={() => {
          dispatch({ type: "create", newItem: {
            label: "new item",
            id: crypto.randomUUID(),
            href: "#ni001",
            type: "link",
            isEditing : true,
          } });
        }}
      >
        <FileIcon className="mr-3 text-lg" />
        New Page
      </ContextMenu.Option>
      <ContextMenu.Option
        onClick={() => {
          const item: ItemProps = {
            label: "new item",
            id: crypto.randomUUID(),
            items: [],
            type: "category",
            isEditing : true,
          };
          dispatch({ type: "create", newItem: item });
        }}
      >
        <BookIcon className="mr-3 text-lg" />
        New Category
      </ContextMenu.Option>
    </ContextMenu.Content>
  );
}
