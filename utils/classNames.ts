type NullableStrings = string | number | boolean | null | undefined;

/**
 * Joins strings ignoring falsey values.
 *
 * @returns A space separated string.
 */
function classNames(...args: NullableStrings[]) {
  return args.filter((className) => Boolean(className)).join(" ");
}

export default classNames;
