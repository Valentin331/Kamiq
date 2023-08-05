/**
 * `AsyncFunctionWithArgs` type represents a function that is asynchronous and takes a certain number of arguments.
 * This function is expected to return a Promise that resolves to a certain type.
 *
 * @template T - The type of the result that the Promise resolves to
 * @template Args - A tuple type representing the types of the arguments that the function takes
 */
export type AsyncFunctionWithArgs<T, Args extends any[]> = (...args: Args) => Promise<T>