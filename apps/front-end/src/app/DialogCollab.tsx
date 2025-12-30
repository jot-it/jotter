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
import { LockIcon, UnlockIcon } from "../components/Icons";
import { IS_BROWSER } from "@/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useIsCollaborationEnabled } from "@/lib/collaboration";

type DialogCollabProps = {
  notebookId: string;
};

export default function DialogCollab({ notebookId }: DialogCollabProps) {
  const pathname = usePathname();
  const fullUrl = `${getOrigin()}${pathname}`;
  const [isCollaborationEnabled, setIsCollaborationEnabled] = useIsCollaborationEnabled();
  const [open, setOpen] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  const toggleSharing = () => {
    setIsCollaborationEnabled(!isCollaborationEnabled);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Share notebook" className="max-md:rounded-full">
          {isCollaborationEnabled ? <UnlockIcon /> : <LockIcon />}
          <span className="ml-1 hidden md:inline">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share your notebook</DialogTitle>
          <DialogDescription>
            {isCollaborationEnabled
              ? "Anyone with this link will have access to your notes."
              : "This notebook is private. Enable sharing to allow others to collaborate."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {isCollaborationEnabled && (
            <div className="flex items-center justify-between gap-4">
              <Input defaultValue={fullUrl} readOnly />
              <CopyButton onClick={copyToClipBoard} />
            </div>
          )}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              {isCollaborationEnabled ? (
                <>
                  <UnlockIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Sharing enabled</span>
                </>
              ) : (
                <>
                  <LockIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Sharing disabled</span>
                </>
              )}
            </div>
            <Button
              variant={isCollaborationEnabled ? "destructive" : undefined}
              size="small"
              onClick={toggleSharing}
            >
              {isCollaborationEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getOrigin() {
  return IS_BROWSER ? window.location.origin : "";
}
