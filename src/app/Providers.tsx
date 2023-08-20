"use client";

import { Provider } from "jotai";
import { PropsWithChildren } from "react";
import CollaborationProvider from "./CollaborationContext";

function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      <CollaborationProvider />
      {children}
    </Provider>
  );
}

export default Providers;
