"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { buttonVariants } from "@/components/Button";
import clsx from "clsx";
import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  HTMLAttributes,
} from "react";
import { VariantProps } from "class-variance-authority";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

type AlertDialogRef = ElementRef<typeof AlertDialogPrimitive.Overlay>;
type AlertDialogProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Overlay
>;

const AlertDialogOverlay = forwardRef<AlertDialogRef, AlertDialogProps>(
  function AlertDialogOverlay({ className, ...props }, ref) {
    return (
      <AlertDialogPrimitive.Overlay
        className={clsx(
          "bg-background/80 fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

type AlertDialogContentRef = ElementRef<typeof AlertDialogPrimitive.Content>;
type AlertDialogContentProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>;

const AlertDialogContent = forwardRef<
  AlertDialogContentRef,
  AlertDialogContentProps
>(function AlertDialogContent({ className, ...props }, ref) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={clsx(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-gray-50 p-6 shadow-lg drop-shadow-md duration-200 data-[disabled]:text-gray-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:bg-slate-800 sm:rounded-lg md:w-full",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});

function AlertDialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogTitleRef = ElementRef<typeof AlertDialogPrimitive.Title>;
type AlertDialogTitleProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Title
>;

const AlertDialogTitle = forwardRef<AlertDialogTitleRef, AlertDialogTitleProps>(
  function AlertDialogTitle({ className, ...props }, ref) {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        className={clsx("text-lg font-semibold", className)}
        {...props}
      />
    );
  },
);

type AlertDialogDescriptionRef = ElementRef<
  typeof AlertDialogPrimitive.Description
>;
type AlertDialogDescriptionProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>;

const AlertDialogDescription = forwardRef<
  AlertDialogDescriptionRef,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={clsx("text-sm dark:text-gray-300", className)}
      {...props}
    />
  );
});

type AlertDialogActionRef = ElementRef<typeof AlertDialogPrimitive.Action>;
type AlertDialogActionProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> &
  ButtonVariants;

type ButtonVariants = Pick<VariantProps<typeof buttonVariants>, "variant">;

const AlertDialogAction = forwardRef<
  AlertDialogActionRef,
  AlertDialogActionProps
>(function AlertDialogAction({ className, variant, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={clsx(buttonVariants({ variant }), className)}
      {...props}
    />
  );
});

type AlertDialogCancelRef = ElementRef<typeof AlertDialogPrimitive.Cancel>;
type AlertDialogCancelProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>;

const AlertDialogCancel = forwardRef<
  AlertDialogCancelRef,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={clsx(
        buttonVariants({ variant: "secondary" }),
        "mt-2 sm:mt-0",
        className,
      )}
      {...props}
    />
  );
});

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
