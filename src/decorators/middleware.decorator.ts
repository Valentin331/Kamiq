import { Metadata } from '../enums'
import { IMetadataService } from '../interfaces'
import { container } from 'tsyringe'
import { getService } from '../utils/getService.function'
import { KamiqMiddleware } from '../interfaces/kamiqMiddleware.interface'
import { NextFunction, Request, Response } from 'express'

/**
 * Decorator function that associates a middleware with a class method.
 *
 * @param {KamiqMiddleware} middleware - Middleware instance that implements the `KamiqMiddleware` interface.
 * @param {any} [options] - Optional configuration for the middleware. TODO: Define a type for the options.
 * @returns {Function} A function decorator that processes the given middleware before the method.
 * 
 * @example
 * ```typescript
 * @Middleware(new MyCustomMiddleware(), { ignore: true })
 * someMethod() {
 *   // ...
 * }
 * ```
 */
export function Middleware(middleware: KamiqMiddleware, options?: any) { // TODO: ADD options type
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataService = getService<IMetadataService>('MetadataService')

    const exisitngMiddlewares: Array<any> = metadataService.get(Metadata.MIDDLEWARES, target.constructor.uuid) ?? [] // TODO: Do i need this empty array here as a backup?
    exisitngMiddlewares.unshift({
      handler: target[propertyKey],
      middleware: (req: Request, res: Response, next: NextFunction) => {
        if (options && options.ignore) return next()
        middleware.use(req, res, next)
      },
    })
    metadataService.set(Metadata.MIDDLEWARES, target.constructor.uuid, exisitngMiddlewares)
  }
}
