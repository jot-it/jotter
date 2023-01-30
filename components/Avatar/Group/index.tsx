import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const Spacing = [
  "-space-x-0",
  "-space-x-1",
  "-space-x-2",
  "-space-x-3",
  "-space-x-4",
  "-space-x-5",
  "-space-x-6",
] as const;

interface AvatarGroupProps extends ComponentPropsWithoutRef<"div"> {
  spacing?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          "flex",
          "overflow-hidden",
          spacing && Spacing[spacing]
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
