import {
  CgTrashEmpty as DeleteIcon,
  CgFile as FileIcon,
  CgInfo as InfoIcon,
  CgRename as RenameIcon,
} from "react-icons/cg";
import { RiBook2Line as BookIcon } from "react-icons/ri";
import ContextMenu from "../ContextMenu";
import { useSidebarDispatch } from "./SidebarContextProvider";

type ActionProps = {
  id: string;
};

export function LinkActions({ id }: ActionProps) {
  return (
    <ContextMenu.Content>
      <RenameAction id={id} />
      <DeleteItemAction id={id} />

      {process.env.NODE_ENV !== "production" && (
        <>
          <ContextMenu.Divider />
          <DevActions id={id} />
        </>
      )}
    </ContextMenu.Content>
  );
}

export function CategoryActions({ id }: ActionProps) {
  return (
    <ContextMenu.Content>
      <InsertPageAction id={id} />
      <ContextMenu.Divider />
      <RenameAction id={id} />
      <DeleteItemAction id={id} />
    </ContextMenu.Content>
  );
}

export function SidebarActions() {
  return (
    <ContextMenu.Content>
      <NewPageAction />
      <NewCategoryAction />
    </ContextMenu.Content>
  );
}

function RenameAction({ id }: ActionProps) {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Option
      onClick={(e) => {
        //e.stopPropagation();
        // Prevent executing whe user alse click outside
        e.nativeEvent.stopImmediatePropagation();
        dispatch({
          id,
          type: "rename",
          isEditing: true,
        });
      }}
    >
      <RenameIcon className="mr-3 text-lg" />
      <span>Rename</span>
    </ContextMenu.Option>
  );
}

function DeleteItemAction({ id }: ActionProps) {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Option
      className="text-rose-800 data-[highlighted]:bg-rose-200/75  dark:text-red-400 dark:data-[highlighted]:text-red-400"
      onClick={() => {
        dispatch({ type: "delete", id });
      }}
    >
      <DeleteIcon className="mr-3 text-lg " />
      <span>Delete</span>
    </ContextMenu.Option>
  );
}

function NewPageAction() {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Option
      onClick={() => {
        dispatch({
          type: "create",
          newItem: {
            type: "link",
            label: "",
          },
        });
      }}
    >
      <FileIcon className="mr-3 text-lg" />
      New Page
    </ContextMenu.Option>
  );
}

function NewCategoryAction() {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Option
      onClick={() => {
        dispatch({
          type: "create",
          newItem: {
            type: "category",
            label: "",
            items: [],
          },
        });
      }}
    >
      <BookIcon className="mr-3 text-lg" />
      New Category
    </ContextMenu.Option>
  );
}

//TODO: Open it by default
function InsertPageAction({ id }: ActionProps) {
  const dispatch = useSidebarDispatch();
  return (
    <ContextMenu.Option
      onClick={() => {
        dispatch({
          type: "insert",
          id,
          newItem: {
            label: "",
            type: "link",
          },
        });
      }}
    >
      <FileIcon className="mr-3 text-lg" />
      Add new page
    </ContextMenu.Option>
  );
}

function DevActions({ id }: ActionProps) {
  return (
    <ContextMenu.Option disabled={true}>
      <InfoIcon className="mr-3 text-lg " />
      {"Id: " + id}
    </ContextMenu.Option>
  );
}