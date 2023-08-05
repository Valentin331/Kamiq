import { OperationResult } from "./operationResult.interface"
import { AsyncFunctionWithArgs } from "../types"


/**
 * `OperationWrapper` is a higher order function that takes a function and wraps it in a try/catch block.
 * The function provided should be an async function and should return a Promise.
 * The wrapper will then return a new function that, when called, will call the provided function inside a try/catch block.
 * If the Promise resolves, the wrapper will return an object with `success` set to true and `data` set to the resolved value of the Promise.
 * If the Promise rejects, the wrapper will return an object with `success` set to false and `error` set to the error that was caught.
 *
 * @template T - The type of the result that the Promise resolves to
 * @template Args - A tuple type representing the types of the arguments that the function takes
 * @param {AsyncFunctionWithArgs<T, Args>} fn - The async function to wrap
 * @returns {(...args: Args) => Promise<OperationResult<T>>} The wrapped function
 */
export function OperationWrapper<T, Args extends any[]>(
    fn: AsyncFunctionWithArgs<T, Args>,
  ): (...args: Args) => Promise<OperationResult<T>> {
    return async function (...args: Args): Promise<OperationResult<T>> {
      try {
        const data = await fn(...args)
        return {
          success: true,
          data,
        }
      } catch (error) {
        return {
          success: false,
          // TODO: Fix this
          // @ts-ignore
          error,
        }
      }
    }
  }