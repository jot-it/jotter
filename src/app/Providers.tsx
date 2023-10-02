"use client";
import { Provider, atom } from "jotai";
import { PropsWithChildren } from "react";

// Global initial values for atoms can be passed as props to the provider
// component. This is useful for SSR, where you can initialize the atoms from
// the server and pass them to the client.
// export type AppStateProps = {
//   user: User;
// };

export type User = {
  name: string;
  color: string;
  image?: string;
};

export const userAtom = atom<User | null>(null);

userAtom.onMount = (setUser) => {
  fetch("/api/user")
    .then((r) => r.json())
    .then((user) => {
      setUser(user);
    });
};

function Providers({ children }: PropsWithChildren) {
  return (
    <Provider>
      {/* <InitializeAtoms {...initialValues} /> */}
      {children}
    </Provider>
  );
}

// function InitializeAtoms() {
//   useHydrateAtoms([[userAtom, props.user]]);
//   return null;
// }

export default Providers;
