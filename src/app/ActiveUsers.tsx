"use client";
import Avatar from "@/components/Avatar";
import { rootDocument } from "@/lib/collaboration";
import { sharedProxy } from "@/lib/valtio";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { User, userAtom } from "./Providers";

const MAX_ACTIVE_USERS = 5;

const users = sharedProxy<User[]>([], rootDocument.getArray("activeUsers"));

function ActiveUsers() {
  const self = useAtomValue(userAtom);
  const snap = useSnapshot(users);
  const hasMoreUsers = snap.length > MAX_ACTIVE_USERS;

  useEffect(() => {
    if (self) {
      users.push(self);
    }
  }, [self]);

  const otherUsers = snap.filter((u) => u.name !== self?.name);

  return (
    <div className="ml-auto mr-4 flex -space-x-1 text-white">
      {hasMoreUsers && (
        <Avatar className="bg-gray-200 text-gray-700">
          +{users.length - MAX_ACTIVE_USERS}
        </Avatar>
      )}
      <Avatar style={{ background: self?.color }} alt={self?.name} />
      {otherUsers.slice(0, MAX_ACTIVE_USERS).map((u) => (
        <Avatar
          key={u.name}
          style={{ background: u.color }}
          src={u.image}
          alt={u.name}
        />
      ))}
    </div>
  );
}

export default ActiveUsers;
