import { forwardRef } from "react";
import ContextMenu, { OptionProps } from "../ContextMenu";

type ActionProps = Omit<OptionProps, "children"> & {
  label: string;
  icon: React.ReactNode;
};

export const MenuAction = forwardRef<HTMLDivElement, ActionProps>(
  function Action({ className, label, icon, ...props }, ref) {
    return (
      <ContextMenu.Option ref={ref} {...props}>
        <ContextMenu.Icon>{icon}</ContextMenu.Icon>
        <span className="capitalize">{label}</span>
      </ContextMenu.Option>
    );
  },
);
