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

const gutterVariants: Record<Variants, string> = {
  h1: "mb-4",
  h2: "mb-4",
  h3: "mb-4",
  h4: "mb-2",
  h5: "mb-2",
  h6: "mb-4",
  body1: "mb-4",
  body2: "mb-2",
  button: "mb-2",
  caption: "mb-4",
  overline: "mb-4",
};

interface TypographyProps extends PolymorphicProps {
  variant?: Variants;
  gutterBottom?: boolean;
}

const Typography: RefForwardingComponent<"p", TypographyProps> = forwardRef<
  HTMLElement,
  TypographyProps
>(function Typography(props, ref) {
  const {
    as: Component = "p",
    className,
    children,
    gutterBottom,
    variant = "body1",
    ...others
  } = props;

  return (
    <Component
      className={clsx(className, gutterBottom && gutterVariants[variant], {
        "text-8xl font-light": variant === "h1",
        "text-6xl font-light": variant === "h2",
        "text-5xl": variant === "h3",
        "text-[2.125rem]": variant === "h4",
        "text-2xl font-medium tracking-wide": variant === "h5",
        "text-xl font-medium tracking-wide": variant === "h6",
        "text-base": variant === "body1",
        "text-sm tracking-wide": variant === "body2",
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
