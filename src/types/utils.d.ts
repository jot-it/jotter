/**
 * Distributive version of `Omit` type.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types TypeScript Docs}
 */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/**
 * From a type `T` with a property `OldName` rename it to `TNewName`
 */
type Rename<T, OldName extends keyof T, NewName extends string> = {
  [Property in keyof T as Property extends OldName
    ? NewName
    : Property]: T[Property];
};
