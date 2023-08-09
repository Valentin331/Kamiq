import { Request, Response, NextFunction } from 'express'
import { AsyncRequestHandler } from '../types'

/**
 * This function wraps an asynchronous request handler function in a Promise and adds error handling.
 * If the provided function returns a Promise, `asyncRequestHandler` ensures that if the Promise is rejected, `next` is called with the rejection value.
 * This allows Express to handle errors in asynchronous route handlers in the same way as synchronous route handlers.
 *
 * @param {AsyncRequestHandler} fn - The asynchronous request handler function to wrap. This function should take Express request, response, and next function as parameters.
 *
 * @returns {Function} - A new function that wraps the provided function in a Promise and adds error handling.
 *
 * @example
 *
 * app.get('/some-route', asyncRequestHandler(async (req, res, next) => {
 *   // some asynchronous operation...
 * }));
 */
const asyncRequestHandler = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export { asyncRequestHandler }
