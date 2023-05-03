type SidebarProps = React.ComponentPropsWithoutRef<"aside">;

function Sidebar({ children, ...rest }: SidebarProps) {
  return (
    <nav className="space-y-1 bg-gray-200 px-4 py-12" {...rest}>
      {children}
    </nav>
  );
}

export default Sidebar;
