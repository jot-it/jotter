"use client";
import Avatar from "@/components/Avatar";
import Tooltip from "@/components/Tooltip";
import { useOthers } from "@/lib/userStore";

const MAX_ACTIVE_USERS = 5;

function ActiveUsers() {
  const others = useOthers();
  const hasMoreUsers = others.length > MAX_ACTIVE_USERS;
  return (
    <div className="flex -space-x-1 text-white">
      {hasMoreUsers && (
        <Avatar className="bg-gray-200 text-gray-700">
          +{others.length - MAX_ACTIVE_USERS}
        </Avatar>
      )}

      {others.slice(0, MAX_ACTIVE_USERS).map((u, i) => (
        <Tooltip key={u.name + i} title={u.name}>
          <Avatar style={{ background: u.color }} src={u.image} alt={u.name} />
        </Tooltip>
      ))}
    </div>
  );
}
export default ActiveUsers;
