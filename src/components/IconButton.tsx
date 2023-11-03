"use client";
import clsx from "clsx";
import Typography from "./Typography";
import { PropsWithChildren } from "react";

export const IconButtonVariant = {
  primary:
    "bg-cyan-200 text-cyan-900 hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800",
  secondary:
    "outline outline-1 -outline-offset-1 outline-cyan-200 text-cyan-900 hover:dark:text-cyan-200 hover:outline-cyan-200 dark:outline-cyan-400 dark:text-cyan-400 dark:hover:outline-cyan-200",
  danger:
    "outline outline-1 -outline-offset-1 outline-red-200 text-cyan-900  outline-red-400 text-red-400 hover:outline-red-300 dark:outline-red-400 dark:text-red-400  dark:hover:text-red-300 dark:hover:outline-red-300",
} as const;

export type IconButtonProps = PropsWithChildren<{
  "aria-label"?: string;
  variant?: keyof typeof IconButtonVariant;
  roundeble?: boolean;
}>;

export default function IconButton({
  children,
  variant = "primary",
  roundeble,
}: IconButtonProps) {
  return (
    <Typography
      as="button"
      variant="body1"
      aria-label="Add collaborator"
      className={clsx(
        "inline-flex items-center gap-1 shadow-sm px-3 py-3 md:rounded-md md:px-4 md:py-2 whitespace-nowrap",
        variant && IconButtonVariant[variant],
        roundeble && "rounded-full",
      )}
    >
      {children}
    </Typography>
  );
}
