import { ComponentPropsWithoutRef, forwardRef } from "react";
import { CgFile as FileIcon } from "react-icons/cg";
import ContextMenu from "../ContextMenu";

type ActionProps = Omit<
  ComponentPropsWithoutRef<typeof ContextMenu.Option> &
    ComponentPropsWithoutRef<typeof ContextMenu.Icon> & {
      icon: React.ReactNode;
    },
  "children"
>;

export const MenuAction = forwardRef<HTMLDivElement, ActionProps>(
  function Action({ className, label, icon, ...props }, ref) {
    return (
      <ContextMenu.Option ref={ref} {...props}>
        <ContextMenu.Icon label={label}>{icon}</ContextMenu.Icon>
        <span className="capitalize">{label}</span>
      </ContextMenu.Option>
    );
  },
);

// type ActionProps = ComponentPropsWithoutRef<typeof ContextMenu.Option> & {
//   id: string;
// };

// type InsertActionProps = ActionProps & {
//   type: ItemProps["type"];
//   actionName: string;
// };

// export function LinkActions({ id }: ActionProps) {
//   return (
//     <ContextMenu.Content>
//       <RenameAction id={id} />
//       <DeleteItemAction id={id} />

//       {process.env.NODE_ENV !== "production" && (
//         <>
//           <ContextMenu.Divider />
//           <DevActions id={id} />
//         </>
//       )}
//     </ContextMenu.Content>
//   );
// }

// export function SidebarActions() {
//   return (
//     <ContextMenu.Content>
//       <NewPageAction />
//       <NewCategoryAction />
//     </ContextMenu.Content>
//   );
// }

// export function RenameAction({ id, ...rest }: ActionProps) {
//   return (
//     <ContextMenu.Option {...rest}>
//       <RenameIcon className="mr-3 text-lg" />
//       <span>Rename</span>
//     </ContextMenu.Option>
//   );
// }

// export function DeleteItemAction({ id }: ActionProps) {
//   const dispatch = useSidebarDispatch();
//   return (
//     <ContextMenu.Option
//       className="text-rose-800 data-[highlighted]:bg-rose-200/75  dark:text-red-400 dark:data-[highlighted]:text-red-400"
//       onClick={() => dispatch({ type: "delete", id })}
//     >
//       <DeleteIcon className="mr-3 text-lg " />
//       <span>Delete</span>
//     </ContextMenu.Option>
//   );
// }

// export function NewPageAction() {
//   const dispatch = useSidebarDispatch();
//   return (
//     <ContextMenu.Option
//       onClick={() => {
//         dispatch({
//           type: "create",
//           newItem: {
//             type: "link",
//             label: "",
//           },
//         });
//       }}
//     >
//       <FileIcon className="mr-3 text-lg" />
//       New Page
//     </ContextMenu.Option>
//   );
// }

// function NewCategoryAction() {
//   const dispatch = useSidebarDispatch();
//   return (
//     <ContextMenu.Option
//       onClick={() => {
//         dispatch({
//           type: "create",
//           newItem: {
//             type: "category",
//             label: "",
//             items: [],
//           },
//         });
//       }}
//     >
//       <BookIcon className="mr-3 text-lg" />
//       New Category
//     </ContextMenu.Option>
//   );
// }

export function InsertItemAction({
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof ContextMenu.Option>) {
  return (
    <ContextMenu.Option {...rest}>
      <FileIcon className="mr-3 text-lg" />
      {children}
    </ContextMenu.Option>
  );
}

// function DevActions({ id }: ActionProps) {
//   return (
//     <ContextMenu.Option disabled={true}>
//       <InfoIcon className="mr-3 text-lg " />
//       {"Id: " + id}
//     </ContextMenu.Option>
//   );
// }
