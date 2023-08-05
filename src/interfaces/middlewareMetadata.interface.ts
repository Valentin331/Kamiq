import { NextFunction, Request, Response } from 'express'

/**
 * Interface for metadata for a single middleware.
 */
export interface MiddlewareMetadata {
  handler: Function
  middleware: (req: Request, res: Response, next: NextFunction) => any
}
