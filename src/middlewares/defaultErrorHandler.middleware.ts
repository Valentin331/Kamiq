import { ErrorResponse } from "../interfaces"
import { ErrorRequestHandler } from "../interfaces"
import { BaseError } from "../utils"

/**
 * `errorResponse` is an Express error handling middleware. It generates a custom error response based on the type of error.
 * If the error is an instance of `BaseError` (a custom error), it generates a detailed error response including the error type,
 * the path of the request that caused the error, the status code, and the error message.
 * If the error is not an instance of `BaseError` (i.e., it's an unhandled error), it generates a generic error response.
 *
 * @function errorResponse
 *
 * @param {BaseError | Error} error - The error object. It can be either an instance of `BaseError` (for custom errors)
 * or an instance of the built-in `Error` class (for unhandled errors).
 *
 * @param {Request} req - The Express `Request` object.
 *
 * @param {Response} res - The Express `Response` object.
 *
 * @param {NextFunction} next - The `next` function in the Express middleware chain.
 *
 * @returns {void}
 */
export const defaultErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    // TODO: Make this into a function that can be provided to the server factory.
    let response: ErrorResponse = {
      response: 'error',
      error: {
        type: 'UnhandledError',
        path: req.path,
        statusCode: 500,
        message: 'An unexpected error occurred',
      },
    }
  
    if (error instanceof BaseError) {
      response = {
        response: 'error',
        error: {
          type: error.constructor.name,
          path: req.path,
          statusCode: error.statusCode || 500,
          message: error.message,
        },
      }
    }
  
    res.status(response.error.statusCode).json(response)
    next(error)
  }