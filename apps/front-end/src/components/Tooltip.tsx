"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import Typography from "./Typography";

export const TooltipProvider = TooltipPrimitive.Provider;

type ContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;
type RootProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

type TooltipProps = ContentProps &
  RootProps & {
    /**
     * The text to display.
     */
    title: string;
  };

const Tooltip = forwardRef<
  ElementRef<typeof TooltipPrimitive.Root>,
  TooltipProps
>(function Tooltip(props, ref) {
  const {
    open,
    onOpenChange,
    delayDuration,
    defaultOpen,
    disableHoverableContent,
    title,
    children,
    ...contentProps
  } = props;
  return (
    <TooltipPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      defaultOpen={defaultOpen}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        className="z-50 rounded-md bg-gray-700 px-2 py-1 text-white shadow-md"
        aria-label={title}
        {...contentProps}
        ref={ref}
      >
        <TooltipPrimitive.Arrow className="fill-gray-700" />
        <Typography variant="body2">
          {title}
          {/* <TooltipPrimitive.Arrow /> */}
        </Typography>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
});

export default Tooltip;
