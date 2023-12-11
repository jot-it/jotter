import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<"label">>(
  function Label({ children, className }, ref) {
    return (
      <label
        className={clsx(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        ref={ref}
      >
        {children}
      </label>
    );
  },
);

export { Label };
