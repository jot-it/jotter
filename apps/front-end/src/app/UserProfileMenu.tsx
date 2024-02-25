"use client";
import Avatar from "@/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { LogoutIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { useSelf } from "@/lib/collaboration";
import { signOut } from "next-auth/react";

function UserProfileMenu() {
  const self = useSelf();

  if (!self) {
    return <AvatarSkeleton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="My Profile">
        <Avatar
          className="cursor-pointer"
          src={self.image ?? undefined}
          alt={self.name ?? ""}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4" sideOffset={16}>
        <div className="flex gap-3 px-2 py-1.5">
          <Avatar
            src={self.image ?? undefined}
            alt={self.name ?? ""}
            size="lg"
          />
          <div>
            <DropdownMenuLabel className="!p-0">{self.name}</DropdownMenuLabel>
            {self.email && (
              <Typography as="p" className="text-gray-300">
                {self.email}
              </Typography>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogoutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarSkeleton() {
  return <Avatar className="animate-pulse bg-neutral-300" />;
}

export default UserProfileMenu;
