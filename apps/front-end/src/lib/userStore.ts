import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useAwareness, useConnection } from "./collaboration";

export type User = {
  name: string;
  color: string;
  image?: string;
};

const RANDOM_USER_ENDPOINT = "/api/user";
const FAILED_FETCH_ERROR_MSG = "Failed to fetch user information";

const userAtom = atom<User | null>(null);
userAtom.onMount = (set) => {
  fetchRandomUser().then((user) => set(user));
};

async function fetchRandomUser() {
  const response = await fetch(RANDOM_USER_ENDPOINT);
  if (!response.ok) {
    throw new Error(FAILED_FETCH_ERROR_MSG);
  }
  return response.json();
}

/**
 * Get the current user
 */
export function useSelf() {
  const [user, setUser] = useAtom(userAtom);
  const { awareness } = useConnection();
  useEffect(() => {
    if (user) {
      // Let everyone know who you are
      awareness?.setLocalStateField("user", user);
      return;
    }
  }, [user, setUser, awareness]);
  return user;
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
