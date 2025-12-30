"use client";

import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { getOrCreateLocalIdentity, LocalIdentity } from "./local-identity";

const IdentityContext = createContext<LocalIdentity | null>(null);

export function IdentityProvider({ children }: PropsWithChildren) {
  const identity = useMemo(() => getOrCreateLocalIdentity(), []);

  return (
    <IdentityContext.Provider value={identity}>
      {children}
    </IdentityContext.Provider>
  );
}

export function useLocalIdentity(): LocalIdentity {
  const identity = useContext(IdentityContext);
  if (!identity) {
    throw new Error("useLocalIdentity must be used within IdentityProvider");
  }
  return identity;
}
