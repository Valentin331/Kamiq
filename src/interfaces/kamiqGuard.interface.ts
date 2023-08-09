import { NextFunction, Request, Response } from "express";

/**
 * Represents a Guard in the Kamiq framework. Guards are specialized
 * middlewares that focus primarily on authentication and authorization
 * logic, determining if a request should proceed further into the 
 * application or be rejected.
 *
 * @interface KamiqGuard
 */
export interface KamiqGuard {
    /**
     * Determines if a request should be allowed or denied. Should
     * return `true` if the request is allowed and `false` otherwise.
     *
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next middleware function.
     * 
     * @returns {boolean} - Returns `true` if the request is allowed, `false` otherwise.
     */
    use(req: Request, res: Response, next: NextFunction): boolean
    /**
     * (Optional) Provides a custom error to be thrown when the `use` method
     * returns `false`. If not provided, a default error may be thrown.
     * 
     * @returns {Error} - A custom error object.
     */
    setError?(): Error
}