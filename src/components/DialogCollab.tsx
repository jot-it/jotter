"use client";

import { isCollabAtom } from "@/lib/collaboration";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import Button from "./Button";
import { CopyIcon, StopIcon, UserAddIcon } from "./Icons";

export default function DialogCollab() {
  const setCollab = useSetAtom(isCollabAtom);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);
  params.set("room", nanoid(8));

  const url = `${pathname}?${params}`;
  const fullUrl = getUrlOrigin() + url;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  const startCollab = () => {
    setCollab(true);
    router.push(url);
  };

  const stopCollab = () => {
    setCollab(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mr-1" size="large">
          Large
        </Button>
        <Button
          aria-label="Add collaborator"
          onClick={startCollab}
          className="rounded-full"
        >
          <UserAddIcon />
          <span className="ml-1 hidden md:inline">Share</span>
        </Button>
        <Button className="ml-1" size="small">
          Small
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Collaboration</DialogTitle>
          <DialogDescription>
            Copy and share the link to your new collaborative session to get
            started.
          </DialogDescription>

          <div className="pt-4 flex gap-4 flex-col">
            <span className="inline-flex gap-2">
              <input
                className="selection:text-white selection:bg-cyan-700 text-ellipsis w-full px-2 py-1 rounded outline outline-1 -outline-offset-1 outline-slate-300 dark:outline-slate-500 dark:bg-slate-900 bg-slate-50"
                defaultValue={fullUrl}
                readOnly
              />

              <Button onClick={copyToClipBoard}>
                <CopyIcon />
                Copy link
              </Button>

              <DialogClose asChild>
                <Button variant="danger" onClick={stopCollab}>
                  <StopIcon />
                  Abort
                </Button>
              </DialogClose>
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
