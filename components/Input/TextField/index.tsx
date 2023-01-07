import { ComponentPropsWithRef, forwardRef } from "react";
import classNames from "../../../utils/classNames";

export type Props = Omit<ComponentPropsWithRef<"input">, "type">;

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  props,
  ref
) {
  const { className, ...rest } = props;
  const inputClass = classNames(
    className,
    "m-1 px-1 py-3 text-lg ring-blue-400",
    "focus:outline-none focus:ring-2"
  );

  return <input type="text" ref={ref} className={inputClass} {...rest} />;
});

export default TextField;
