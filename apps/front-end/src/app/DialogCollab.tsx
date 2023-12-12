"use client";

import { nanoid } from "nanoid";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
import { CopyIcon, UserAddIcon } from "../components/Icons";

export default function DialogCollab() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  params.set("room", nanoid(8));

  const url = `${pathname}?${params}`;
  const fullUrl = getUrlOrigin() + url;

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Collaboration</DialogTitle>
          <DialogDescription>
            Copy and share the link to your new collaborative session to get
            started.
          </DialogDescription>

          <div className="flex flex-col gap-4 pt-4">
            <span className="inline-flex gap-2">
              <input
                className="w-full text-ellipsis rounded bg-slate-50 px-2 py-1 outline outline-1 -outline-offset-1 outline-slate-300 selection:bg-cyan-700 selection:text-white dark:bg-slate-900 dark:outline-slate-500"
                defaultValue={fullUrl}
                readOnly
              />

              <Button onClick={copyToClipBoard}>
                <CopyIcon />
                Copy link
              </Button>
            </span>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function getUrlOrigin() {
  if (typeof window === "undefined") return "";
  return window.origin;
}
