"use client";

import CopyButton from "@/components/CopyButton";
import { Input } from "@/components/Input";
import Button from "../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
import { UserAddIcon } from "../components/Icons";
import { IS_BROWSER } from "@/utils";
import { usePathname } from "next/navigation";

export default function DialogCollab() {
  const pathname = usePathname();
  const fullUrl = `${getOrigin()}${pathname}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Add collaborator" className="max-md:rounded-full">
          <UserAddIcon />
          <span className="ml-1 hidden md:inline">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Collaboration</DialogTitle>
          <DialogDescription>
            Share this link and anyone who have it can calaborate with you.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-4 pt-4">
          <Input defaultValue={fullUrl} readOnly />
          <CopyButton onClick={copyToClipBoard} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getOrigin() {
  return IS_BROWSER ? window.location.origin : "";
}
