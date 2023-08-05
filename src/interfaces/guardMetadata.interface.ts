import { NextFunction, Request, Response } from 'express'

/**
 * Interface for metadata for a single guard.
 */
export interface GuardMetadata {
  handler: Function
  guardMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<boolean>
}
