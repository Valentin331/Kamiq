import { NextFunction, Request, Response } from "express";
import { BaseError } from "../utils";

/**
 * The `ErrorRequestHandler` type defines the function signature for an Express error handling middleware.
 *
 * @typedef {Function} ErrorRequestHandler
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
export type ErrorRequestHandler = (error: BaseError | Error, req: Request, res: Response, next: NextFunction) => void