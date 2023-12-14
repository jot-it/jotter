import { atom, useAtomValue } from "jotai";
import { getRootConnectionProvider, useAwareness } from "./collaboration";

export type User = {
  name: string;
  color: string;
  image?: string;
};

const USER_STORAGE_KEY = "user";

export const userAtom = atom<User | null>(null);

userAtom.onMount = (setUserAtom) => {
  const setUser = (user: User) => {
    setStoredUser(user);
    setAwarenessUser(user);
    setUserAtom(user);
  };

  const user = getStoredUser();
  if (user) {
    setUser(user);
    return;
  }
  // Randomly generate a new user
  fetch("/api/user")
    .then((r) => r.json())
    .then((user) => {
      setUser(user);
    });
};

/**
 * Get the current user
 */
export function useSelf() {
  return useAtomValue(userAtom);
}

export function useOthers() {
  const awareness = useAwareness();
  const others: User[] = [];

  awareness?.forEach((state, clientId) => {
    const isMyself =
      clientId === getRootConnectionProvider()?.awareness?.clientID;
    if (!isMyself && state.user) {
      others.push(state.user);
    }
  });

  return others;
}

function setStoredUser(user: User) {
  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function setAwarenessUser(user: User) {
  getRootConnectionProvider()?.awareness?.setLocalStateField("user", user);
}

function getStoredUser(): User | null {
  const user = sessionStorage.getItem(USER_STORAGE_KEY);
  if (!user) return null;
  return JSON.parse(user);
}
