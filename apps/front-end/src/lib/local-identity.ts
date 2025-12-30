// Local identity stored in localStorage with adjective-animal names
// Persists until browser history is cleared

import { nanoid } from "nanoid";

const IDENTITY_STORAGE_KEY = "jotter_user_identity";

const ADJECTIVES = [
  "happy",
  "swift",
  "clever",
  "brave",
  "calm",
  "bright",
  "kind",
  "bold",
  "quick",
  "gentle",
  "witty",
  "jolly",
  "wise",
  "fresh",
  "keen",
  "nimble",
  "noble",
  "keen",
  "perky",
  "rad",
  "cool",
  "crazy",
  "groovy",
  "funky",
  "zippy",
  "snappy",
];

const ANIMALS = [
  "fox",
  "bear",
  "wolf",
  "eagle",
  "panda",
  "lion",
  "tiger",
  "otter",
  "dolphin",
  "penguin",
  "hawk",
  "deer",
  "rabbit",
  "squirrel",
  "owl",
  "moose",
  "lynx",
  "badger",
  "raven",
  "elk",
  "meerkat",
  "tern",
  "sloth",
  "whale",
  "bison",
  "jackal",
];

export interface LocalIdentity {
  id: string;
  name: string;
}

function generateRandomName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adjective}-${animal}`;
}

export function getOrCreateLocalIdentity(): LocalIdentity {
  if (typeof window === "undefined") {
    // Fallback for server-side rendering
    return {
      id: nanoid(),
      name: generateRandomName(),
    };
  }

  try {
    const stored = localStorage.getItem(IDENTITY_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // localStorage may not be available in some contexts
  }

  const identity: LocalIdentity = {
    id: nanoid(),
    name: generateRandomName(),
  };

  try {
    localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identity));
  } catch {
    // localStorage may not be available
  }

  return identity;
}

export function clearLocalIdentity(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(IDENTITY_STORAGE_KEY);
  } catch {
    // localStorage may not be available
  }
}
