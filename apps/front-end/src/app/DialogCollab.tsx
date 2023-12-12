"use client";

import { Input } from "@/components/Input";
import { lazy, useState } from "react";
import Button from "../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/Dialog";
import { CheckIcon, CopyIcon, UserAddIcon } from "../components/Icons";

const Tooltip = lazy(() => import("@/components/Tooltip"));

const ANIMATION_STATE_RESET_DELAY = 1500;

export default function DialogCollab() {
  const [copied, setCopied] = useState(false);
  const fullUrl = window?.location.href ?? "";

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
    });
    setTimeout(() => setCopied(false), ANIMATION_STATE_RESET_DELAY);
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
          <Tooltip title={copied ? "Copied" : "Copy"} open={copied}>
            <Button className="py-3" onClick={copyToClipBoard}>
              {!copied ? (
                <CopyIcon
                  className="duration-500 animate-in fade-in"
                  aria-hidden
                />
              ) : (
                <CheckIcon
                  className="duration-500 animate-in fade-in zoom-in"
                  aria-hidden
                />
              )}
              <span className="sr-only">Copy link</span>
            </Button>
          </Tooltip>
        </div>
      </DialogContent>
    </Dialog>
  );
}
