import clsx from "clsx";
import React, { Fragment, cloneElement } from "react";
import { MdNavigateNext as NextIcon } from "react-icons/md";

type BreadcrumbsProps = React.ComponentPropsWithoutRef<"ol">;

function Breadcrumbs({ children, className, ...rest }: BreadcrumbsProps) {
  const lastIndex = React.Children.count(children) - 1;
  return (
    <nav>
      <ol className={clsx(className, "flex items-center gap-1")} {...rest}>
        {React.Children.map(children, (child, index) => (
          <Fragment key={index}>
            <li>
              {cloneElement(child as React.ReactElement, {
                className: clsx(
                  "p-2 rounded-md hover:bg-gray-200",
                  index === lastIndex ? "text-gray-800" : "text-gray-500"
                ),
                "aria-current": index === lastIndex ? "page" : undefined,
              })}
            </li>
            {index < lastIndex && (
              <li aria-hidden>
                <NextIcon className="text-gray-400" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
