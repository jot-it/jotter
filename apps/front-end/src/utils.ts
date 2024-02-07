import { MutableRefObject, RefCallback } from "react";

type Ref<T> = RefCallback<T> | MutableRefObject<T> | null;

/**
 * is window defined (browser) ?
 */
export const IS_BROWSER = typeof window !== "undefined";

export const IS_SERVER = !IS_BROWSER;

export function mergeRefs<T = any>(...refs: Ref<T>[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
