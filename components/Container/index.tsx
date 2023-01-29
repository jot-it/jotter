import clsx from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

const Container = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  function Container(props, ref) {
    const { className, children, ...rest } = props;
    const containerClass = clsx(className, "max-w-5xl px-2 mx-auto");
    return (
      <div ref={ref} className={containerClass} {...rest}>
        {children}
      </div>
    );
  }
);

export default Container;
