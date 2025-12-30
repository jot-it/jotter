import { useLocalIdentity } from "@/lib/identity-provider";
import { useState, useEffect } from "react";
import { AwarenessState, useConnection } from "./store";

export function useAwareness() {
  const provider = useConnection();
  //TODO this can be optimized so that there is only 1 global awareness state
  const [awareness, setAwareness] = useState<AwarenessState[]>([]);
  useEffect(() => {
    const onAwarenessChange = ({ states }: { states: AwarenessState[] }) => {
      setAwareness(states);
    };
    provider.on("awarenessUpdate", onAwarenessChange);
    return () => {
      provider.off("awarenessUpdate", onAwarenessChange);
    };
  }, [provider]);
  return awareness;
}

export function useSelf() {
  const identity = useLocalIdentity();
  return {
    id: identity.id,
    name: identity.name,
  };
}

export function useOthers() {
  const me = useSelf();
  const sharedState = useAwareness();
  return sharedState.filter((state) => state.user.id !== me.id);
}

export function useIsSynced() {
  const provider = useConnection();
  const [isSynced, setIsSynced] = useState(provider.isSynced);

  useEffect(() => {
    const onSynced = () => setIsSynced(true);
    provider.on("sync", onSynced);
    return () => {
      provider.off("sync", onSynced);
    };
  }, [provider]);

  return isSynced;
}
