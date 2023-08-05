// TODO: Add default error loggin middleware

import { ErrorRequestHandler } from "express"
import { BaseError } from "../utils/errors/application/BaseError.class"

/**
 * The `errorLogging` middleware logs the details of an error that has been thrown during the execution of an HTTP request.
 * This middleware is designed to be used in an Express.js application and should be added to the middleware stack after all other middleware and routes.
 * This allows it to catch and log errors from the entire application.
 *
 * @function errorLogging
 * @type {ErrorRequestHandler}
 *
 * @param {BaseError | Error} error - The error that has been thrown.
 * @param {Request} req - The Express.js request object.
 * @param {Response} res - The Express.js response object.
 * @param {NextFunction} next - The next function in the Express.js middleware stack.
 *
 * @returns {void}
 */
export const errorLogging: ErrorRequestHandler = (error, req, res, next) => {
    // TODO: Make this into a function that can be provided to the server factory.
    console.log('ERROR')
    console.log(`Type: ${error instanceof BaseError ? error.constructor.name : 'UnhandledError'}`)
    console.log('Path: ' + req.path)
    console.log(`Status code: ${error instanceof BaseError ? error.statusCode : 500}`)
    console.log(error.stack)
    next(error)
  }