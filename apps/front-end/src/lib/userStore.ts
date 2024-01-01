import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect } from "react";
import { useAwareness, useConnection } from "./collaboration";

export type User = {
  name: string;
  color: string;
  image?: string;
};

const USER_STORAGE_KEY = "user";

const FAILED_FETCH_ERROR_MSG = "Failed to fetch user information";

// Store on session storage so that users get a new username when they re-open their browser
const userStorage = createJSONStorage<User | null>(() => window.sessionStorage);
export const userAtom = atomWithStorage<User | null>(
  USER_STORAGE_KEY,
  null,
  userStorage,
  {
    getOnInit: true,
  },
);

/**
 * Get the current user
 */
export function useSelf() {
  const [user, setUser] = useAtom(userAtom);
  const connection = useConnection();
  useEffect(() => {
    if (user) {
      // Let everyone know who you are
      connection.awareness?.setLocalStateField("user", user);
      return;
    }
    fetchRandomUser().then((user) => setUser(user));
  }, [user, setUser]);
  return user;
}

async function fetchRandomUser() {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error(FAILED_FETCH_ERROR_MSG);
  }
  return await response.json();
}

export function useOthers() {
  const awareness = useAwareness();
  const connection = useConnection();
  const others: User[] = [];

  awareness?.forEach((state, clientId) => {
    const isMyself = clientId === connection.awareness?.clientID;
    if (!isMyself && state.user) {
      others.push(state.user);
    }
  });

  return others;
}
