import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useAwareness } from "./collaboration";

/**
 * Get the current user
 */
export function useSelf() {
  const { data } = useSession();
  return data?.user;
}

export function useOthers() {
  const me = useSelf();
  const sharedState = useAwareness();
  const others: User[] = [];

  sharedState?.forEach((state) => {
    const isMyself = state.user.id === me?.id;
    if (!isMyself && state.user) {
      others.push(state.user);
    }
  });

  return others;
}
