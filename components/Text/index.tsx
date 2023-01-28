import { forwardRef } from "react";
import cn from "../../utils/classNames";
import { AsProp, RefForwardingComponent } from "../helpers";

const Variants = {
  h1: "",
  h2: "",
  h3: "",
  h4: "",
  h5: "",
  h6: "",
  body: "",
} as const;

interface TextProps extends React.HTMLAttributes<HTMLElement>, AsProp {
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
    <Component className={cn(className)} {...others} ref={ref}>
      {children}
    </Component>
  );
});

Text.displayName = "Text";

export default Text;
