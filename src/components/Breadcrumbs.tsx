import clsx from "clsx";
import React from "react";
import { MdNavigateNext as NextIcon } from "react-icons/md";

type BreadcrumbsProps = React.ComponentPropsWithoutRef<"ol">;

function Breadcrumbs({ children, className, ...rest }: BreadcrumbsProps) {
  const lastIndex = React.Children.count(children) - 1;
  return (
    <nav>
      <ol className={clsx(className, "flex items-center gap-1")} {...rest}>
        {React.Children.map(children, (child, index) => (
          <>
            <li key={index}>{child}</li>
            {index < lastIndex && (
              <li aria-hidden>
                <NextIcon className="text-gray-400" />
              </li>
            )}
          </>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
