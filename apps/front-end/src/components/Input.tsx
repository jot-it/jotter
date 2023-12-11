import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, ...props },
  ref,
) {
  return (
    <input
      type={type}
      className={clsx(
        "w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm selection:bg-cyan-700 selection:text-white dark:border-slate-600 dark:bg-slate-900",
        "ring-cyan-600 focus:outline-none focus:ring-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Input };
