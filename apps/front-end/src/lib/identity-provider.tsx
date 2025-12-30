"use client";

import { useAtomValue } from "jotai";
import { identityAtom, LocalIdentity } from "./local-identity";

export function useLocalIdentity(): LocalIdentity {
  return useAtomValue(identityAtom)
}
