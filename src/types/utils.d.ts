/**
 * Recursively make all properties of T readonly.
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
