"use client";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap shadow-sm md:rounded-md md:px-4 md:py-2",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-200 text-cyan-900 hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800",
        danger:
          " text-red-400 outline outline-1 -outline-offset-1  outline-red-200  hover:outline-red-300 dark:text-red-400 dark:outline-red-400  dark:hover:text-red-300 dark:hover:outline-red-300",
        secondary:
          "text-cyan-900 outline outline-1 -outline-offset-1 outline-cyan-200 hover:outline-cyan-200 dark:text-cyan-400 dark:outline-cyan-400 hover:dark:text-cyan-200 dark:hover:outline-cyan-200",
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
