type SidebarProps = React.ComponentPropsWithoutRef<"aside">;

function Sidebar({ children, ...rest }: SidebarProps) {
  return <nav {...rest}>{children}</nav>;
}

export default Sidebar;
