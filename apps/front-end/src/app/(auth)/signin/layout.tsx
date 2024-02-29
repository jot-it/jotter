import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Jotter - Sign In",
};

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-8">
      {children}
    </div>
  );
}

export default Layout;
