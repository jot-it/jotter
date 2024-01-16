"use client";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-center shadow-sm ring-cyan-600 ring-offset-2 transition-colors " +
    "font-medium ring-offset-slate-900 focus-visible:outline-none focus-visible:ring-2 md:px-4 md:py-2",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-200 text-cyan-900 hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800",
        secondary: "border border-slate-700 bg-slate-900 hover:bg-slate-700",
        destructive: "bg-rose-600 text-white ring-rose-600",
        link: "text-slate-800 hover:text-cyan-800 dark:text-slate-200 hover:dark:text-cyan-400",
      },
      size: {
        medium: "p-3",
        small: "px-1 py-2 text-sm",
        large: "px-5 py-4 text-2xl",
      },
    },
    defaultVariants: {
      size: "medium",
      variant: "primary",
    },
  },
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { children, variant, size, className, ...rest } = props;
    return (
      <button
        type="button"
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
