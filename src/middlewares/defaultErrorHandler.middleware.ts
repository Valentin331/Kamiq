import { NextFunction, Request, Response } from 'express'
import { ErrorResponse, KamiqMiddleware } from '../interfaces'
import { ErrorRequestHandler } from '../interfaces'
import { BaseError } from '../utils'
import { KamiqErrorMiddleware } from '../interfaces/kamiqErrorMiddleware.interface'

export class DefaultErrorHandler implements KamiqErrorMiddleware {
  // TODO: Convert this into a config object, not just arguments like this.
  private readonly log: boolean = false

  constructor(log?: boolean) {
    if (log) this.log = log
  }

  // TODO: This whole thing should be take in environemnt mode as a modifier!

  use(err: any, req: Request, res: Response, next: NextFunction): void {
    // TODO: This whole thing needs to be refactored. 
    let response: ErrorResponse = {
      response: 'error',
      error: {
        type: 'UnhandledError',
        path: req.path,
        statusCode: 500,
        message: 'An unexpected error occurred',
      },
    }

    if (err instanceof BaseError) {
      response = {
        response: 'error',
        error: {
          type: err.constructor.name,
          path: req.path,
          statusCode: err.statusCode || 500,
          message: err.message,
        },
      }
    }

    if (this.log) {
      // TODO: Refactor this logging to console
      console.log('ERROR')
      console.log(`Type: ${err instanceof BaseError ? err.constructor.name : 'UnhandledError'}`)
      console.log('Path: ' + req.path)
      console.log(`Status code: ${err instanceof BaseError ? err.statusCode : 500}`)
      console.log(err.stack) // TODO: Make stack trace optional!
    }

    res.status(response.error.statusCode).json(response)
    next(err)
  }
}
