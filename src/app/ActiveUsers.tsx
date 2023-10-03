"use client";
import Avatar from "@/components/Avatar";
import { useOthers, useSelf } from "@/lib/userStore";

const MAX_ACTIVE_USERS = 5;

function ActiveUsers() {
  const self = useSelf();
  const others = useOthers();
  const hasMoreUsers = others.length > MAX_ACTIVE_USERS;
  return (
    <div className="ml-auto mr-4 flex -space-x-1 text-white">
      {hasMoreUsers && (
        <Avatar className="bg-gray-200 text-gray-700">
          +{others.length - MAX_ACTIVE_USERS}
        </Avatar>
      )}
      {self ? (
        <Avatar style={{ background: self.color }} alt={self.name} />
      ) : (
        <AvatarSkeleton />
      )}

      {others.slice(0, MAX_ACTIVE_USERS).map((u) => (
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

function AvatarSkeleton() {
  return <Avatar className="bg-neutral-300 animate-pulse" />;
}

export default ActiveUsers;
