/**
 * `OperationResult` type is used to represent the result of an operation.
 * If the operation was successful, it returns an object with `success` set to true and `data` containing the result of the operation.
 * If the operation was not successful, it returns an object with `success` set to false and `error` containing the error that occurred.
 *
 * @template T - The type of the data returned in case of success
 */
export type OperationResult<T> = { success: true; data: T } | { success: false; error: Error }