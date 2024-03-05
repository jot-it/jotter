import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

function Skeleton({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx("animate-pulse rounded-lg bg-slate-700", className)}
    >
      {children}
    </div>
  );
}

export default Skeleton;
