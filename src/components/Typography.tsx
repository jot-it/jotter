import { PolymorphicProps, RefForwardingComponent } from "@/types/as-prop";
import clsx from "clsx";
import { forwardRef } from "react";

export const textVariants = {
  h1: "text-8xl font-light",
  h2: "text-6xl font-light",
  h3: "text-5xl",
  h4: "text-[2.125rem]",
  h5: "text-2xl font-medium tracking-wide",
  h6: "text-xl font-medium tracking-wide",
  body1: "text-base",
  body2: "text-sm tracking-wide",
  button: "uppercase text-base font-medium tracking-widest",
  caption: "text-xs tracking-widest",
  overline: "text-[1.6rem] tracking-wide",
} as const;

const gutterVariants: Record<keyof typeof textVariants, string> = {
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
  variant?: keyof typeof textVariants;
  gutterBottom?: boolean;
}

const Typography: RefForwardingComponent<"span", TypographyProps> = forwardRef<
  HTMLElement,
  TypographyProps
>(function Typography(props, ref) {
  const {
    as: Component = "span",
    className,
    children,
    gutterBottom,
    variant = "body1",
    ...others
  } = props;

  return (
    <Component
      className={clsx(
        className,
        gutterBottom && gutterVariants[variant],
        variant && textVariants[variant]
      )}
      {...others}
      ref={ref}
    >
      {children}
    </Component>
  );
});

export default Typography;
