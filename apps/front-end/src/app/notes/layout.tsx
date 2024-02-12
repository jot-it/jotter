import { PropsWithChildren } from "react";
import SideNavigation from "../SideNavigation";
import Header from "../Header";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid lg:grid-cols-[20rem_auto]">
      <aside className="hidden lg:block">
        <SideNavigation />
      </aside>
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
}
export default Layout;
