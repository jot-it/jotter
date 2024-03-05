import { PropsWithChildren } from "react";
import Header from "../Header";
import SideNavigation from "../SideNavigation";

async function Layout({ children }: PropsWithChildren) {
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
