import { Handler, NextFunction, Request, Response } from 'express'
import { ErrorResponse, KamiqMiddleware } from '../interfaces'
import { ErrorRequestHandler } from '../interfaces'
import { BaseError } from '../utils'
import winston from 'winston'
import expressWinston from 'express-winston'

export class DefaultRequestLogger implements KamiqMiddleware {
  private readonly logger: Handler

  constructor() {
    this.logger = expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(info => `${new Date().toUTCString()} ${info.level}: ${info.message} - ${info.meta.res.statusCode} ${info.meta.req.method} ${info.meta.req.url} - ${info.meta.responseTime}ms`)
      ),
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
    })
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next)      
  }
}
