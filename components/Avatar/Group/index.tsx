import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface AvatarGroupProps extends ComponentPropsWithoutRef<"div"> {
  /** Defines how much avatars stack on top of each other
   * corresponds to tailwind:
   *
   * ```-space-x-${number}```
   */
  space?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, space = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          "flex",
          `-space-x-${space}`,
          "overflow-hidden"
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
