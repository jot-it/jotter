"use client";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { MdNavigateNext as NextIcon } from "react-icons/md";
import Typography from "./Typography";

export type BreadcrumbItem = {
  icon?: ReactNode;
  href: string;
  label: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};
function Breadcrumbs({ items }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;
  return (
    <nav>
      <ol
        className="hidden items-center gap-1 text-gray-500 dark:text-gray-200 sm:flex"
        aria-label="Breadcrumb"
      >
        {items.map(({ icon, href, label }, index) => (
          <Fragment key={href}>
            <li>
              <Link
                className={clsx(
                  "rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700",
                  index === lastIndex && "text-gray-800 dark:text-gray-100",
                )}
                href={href}
                aria-current={index === lastIndex ? "page" : undefined}
              >
                <Typography
                  as="span"
                  variant="body1"
                  className="inline-flex items-center gap-1"
                >
                  {icon && (
                    <span className="text-lg" aria-hidden>
                      {icon}
                    </span>
                  )}
                  {label}
                </Typography>
              </Link>
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
