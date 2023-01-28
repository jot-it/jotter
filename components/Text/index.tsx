import clsx from "clsx";
import { forwardRef } from "react";
import { PolymorphicProps, RefForwardingComponent } from "../helpers";

const Variants = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  body: "",
} as const;

interface TextProps extends PolymorphicProps {
  variant?: keyof typeof Variants;
}

const Text: RefForwardingComponent<"p", TextProps> = forwardRef<
  HTMLElement,
  TextProps
>((props, ref) => {
  const {
    as: Component = "p",
    className,
    children,
    variant,
    ...others
  } = props;

  return (
    <Component className={clsx(className)} {...others} ref={ref}>
      {children}
    </Component>
  );
});

Text.displayName = "Text";

export default Text;
