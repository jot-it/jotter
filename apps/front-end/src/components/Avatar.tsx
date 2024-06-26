"use client";
import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  forwardRef,
  useState,
} from "react";
import { textVariants } from "./Typography";

export type AvatarProps = ComponentPropsWithoutRef<"img"> & {
  size?: "sm" | "md" | "lg" | "xl";
};

type FallbackProps = PropsWithChildren<{
  initials?: string;
  show?: boolean;
}>;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { className, children, size = "md", src, alt, ...rest } = props;
    const [error, setError] = useState(false);

    return (
      <div
        ref={ref}
        className={clsx(
          className,
          "relative flex cursor-default items-center justify-center overflow-hidden rounded-full font-medium",
          textVariants["body1"],
          {
            "h-6 w-6": size === "sm",
            "h-8 w-8": size === "md",
            "h-10 w-10": size === "lg",
            "h-12 w-12": size === "xl",
          },
        )}
        {...rest}
      >
        {!error && src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} onError={() => setError(true)} />
        )}
        <Fallback show={error || !src} initials={alt?.[0]}>
          {children}
        </Fallback>
      </div>
    );
  },
);

function Fallback({ initials, children, show }: FallbackProps) {
  if (!show) return null;

  return <>{children ?? initials}</>;
}

export default Avatar;
