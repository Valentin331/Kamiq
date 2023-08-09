import { Request, Response, NextFunction } from 'express'
import { KamiqGuard } from 'kamiq/interfaces'

export class sampleGuard implements KamiqGuard {
  use(req: Request, res: Response, next: NextFunction): boolean {
    return false
  }

  // setError(): Error {
  //     return new Error('guard stopped execution.')
  // }
}
