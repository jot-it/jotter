import { proxy } from "valtio";
import { bind } from "valtio-yjs";
import { Array, Map } from "yjs";

/**
 * Creates a valtio proxy that is bound to a yjs shared type.
 */
export function sharedProxy<T extends object>(
  initialValue: T,
  sharedType: Array<T> | Map<T>,
): T {
  const valtioProxy = proxy(initialValue);
  bind(valtioProxy as Record<string, T> | T[], sharedType);
  return valtioProxy;
}
