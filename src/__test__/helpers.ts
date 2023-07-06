type FunctionType = (...args: unknown[]) => unknown;

type Mocked<TFun extends FunctionType> = TFun &
  jest.Mock<Partial<ReturnType<TFun>>, Parameters<TFun>>;

/**
 * Utility function to cast a mocked function to a jest mocked function
 *
 * @example
 * import {myFunction} from "myModule";
 *
 * jest.mock("myModule", () => ({
 *  myFunction: jest.fn()
 * }));
 *
 * const mockedMyFunction = mocked(myFunction); // Now the types are correct!
 *
 * @param fun A function that was mocked with `jest.mock`
 */
export function mocked<TFun extends FunctionType>(fun: TFun) {
  if (!jest.isMockFunction(fun)) {
    throw Error(`${fun.name} is NOT a mocked function`);
  }
  return fun as Mocked<TFun>;
}
