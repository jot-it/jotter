/**
 * Recursively make all properties of T readonly.
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * Create a type union of all the values of an object
 */
type ObjectValues<T> = T[keyof T];
