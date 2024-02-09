import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAwareness, useConnection } from "./collaboration";

export type User = {
  name: string;
  color: string;
  image?: string;
};

/**
 * Get the current user
 */
export function useSelf() {
  const { data } = useSession();
  const user = data?.user;
  const { awareness } = useConnection();
  useEffect(() => {
    if (user) {
      // Let everyone know who you are
      awareness?.setLocalStateField("user", user);
      return;
    }
  }, [user, awareness]);

  return data?.user ?? null;
}

export function useOthers() {
  const sharedState = useAwareness();
  const connection = useConnection();
  const others: User[] = [];

  sharedState?.forEach((state, clientId) => {
    const isMyself = clientId === connection.awareness?.clientID;
    if (!isMyself && state.user) {
      others.push(state.user);
    }
  });

  return others;
}
