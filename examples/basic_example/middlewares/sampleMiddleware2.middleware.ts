import { Request, Response, NextFunction } from 'express'
import { KamiqMiddleware } from 'kamiq/interfaces'

const log = console.log

export class MySampleMiddleware2 implements KamiqMiddleware {
  private readonly ignore: boolean

  constructor(ignore: boolean) {
    this.ignore = ignore
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (this.ignore) next()

    log('sample middleware hit2!')
    // Modifying the request object:
    // @ts-ignore
    req.something = 'this is nice'
    next()
  }
}
