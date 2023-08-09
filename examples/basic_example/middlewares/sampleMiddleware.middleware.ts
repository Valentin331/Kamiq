import { Request, Response, NextFunction } from 'express'
import { KamiqMiddleware } from 'kamiq/interfaces'

const log = console.log

export class MySampleMiddleware implements KamiqMiddleware {
  private readonly someValue: boolean

  constructor(someValue: boolean) {
    this.someValue = someValue
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Can use someValue to change behavior...

    log('sample middleware hit!')
    // Modifying the request object:
    // @ts-ignore
    req.something = 'this is nice'
    next()
  }
}
