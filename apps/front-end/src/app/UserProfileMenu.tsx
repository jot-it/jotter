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
import { clearLocalIdentity } from "@/lib/local-identity";
import { useSelf } from "@/lib/collaboration";

function UserProfileMenu() {
  const self = useSelf();

  const handleClearIdentity = () => {
    clearLocalIdentity();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="My Profile">
        <Avatar
          className="cursor-pointer bg-gray-300 text-gray-700"
          alt={self.name}
        >
          {self.name?.[0]?.toUpperCase()}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4" sideOffset={16}>
        <div className="flex gap-3 px-2 py-1.5">
          <Avatar
            className="bg-gray-300 text-gray-700"
            alt={self.name}
            size="lg"
          >
            {self.name?.[0]?.toUpperCase()}
          </Avatar>
          <div>
            <DropdownMenuLabel className="!p-0">{self.name}</DropdownMenuLabel>
            <Typography as="p" className="text-sm text-gray-500">
              Local identity
            </Typography>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClearIdentity}>
          <LogoutIcon className="mr-2" />
          Clear Identity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileMenu;
