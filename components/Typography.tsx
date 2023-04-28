import clsx from "clsx";
import { forwardRef } from "react";
import { PolymorphicProps, RefForwardingComponent } from "./helpers";

type Variants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

interface TypographyProps extends PolymorphicProps {
  variant?: Variants;
}

const Typography: RefForwardingComponent<"p", TypographyProps> = forwardRef<
  HTMLElement,
  TypographyProps
>(function Typography(props, ref) {
  const {
    as: Component = "p",
    className,
    children,
    variant = "body1",
    ...others
  } = props;

  return (
    <Component
      className={clsx(className, {
        "mb-4 text-8xl font-light": variant === "h1",
        "mb-4 text-6xl font-light": variant === "h2",
        "mb-4 text-5xl": variant === "h3",
        "mb-2 text-[2.125rem]": variant === "h4",
        "mb-2 text-2xl font-medium tracking-wide": variant === "h5",
        "mb-4 text-xl font-medium tracking-wide": variant === "h6",
        "mb-4": variant === "body1",
        "mb-2 text-sm tracking-wide": variant === "body2",
        "upppercase text-sm font-medium tracking-widest": variant === "button",
        "text-xs tracking-widest": variant === "caption",
        "text-[1.6rem] tracking-wide": variant === "overline",
      })}
      {...others}
      ref={ref}
    >
      {children}
    </Component>
  );
});

export default Typography;
