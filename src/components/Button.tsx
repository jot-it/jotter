"use client";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center gap-1 md:rounded-md shadow-sm md:px-4 md:py-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-200 text-cyan-900 hover:bg-cyan-300 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800",
        danger:
          "outline outline-1 -outline-offset-1 outline-red-200 text-cyan-900  outline-red-400 text-red-400 hover:outline-red-300 dark:outline-red-400 dark:text-red-400  dark:hover:text-red-300 dark:hover:outline-red-300",
        secondary:
          "outline outline-1 -outline-offset-1 outline-cyan-200 text-cyan-900 hover:dark:text-cyan-200 hover:outline-cyan-200 dark:outline-cyan-400 dark:text-cyan-400 dark:hover:outline-cyan-200",
      },
      size: {
        medium: "p3",
        small: "py-2 px-1 text-sm",
        large: "py-4 px-5 text-2xl",
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
