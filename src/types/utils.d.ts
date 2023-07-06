/**
 * Distributive version of `Omit` type.
 * 
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types TypeScript Docs}
 */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;