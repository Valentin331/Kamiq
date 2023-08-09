import { NextFunction, Request, Response } from 'express'
import { KamiqGuard } from '../../interfaces/kamiqGuard.interface'

export async function executeGuardHandler(
    guard: KamiqGuard,
    guardOptions: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (guardOptions && guardOptions.ignore) {
      return next();
    }
  
    const exec = await guard.use(req, res, next);
    if (exec) {
      return next();
    } else {
      const error = guard.setError ? guard.setError() : new Error('Unauthorized');
      return next(error);
    }
  }
