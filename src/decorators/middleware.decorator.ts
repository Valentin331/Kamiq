import { Metadata } from '../enums'
import { IMetadataService } from '../interfaces'
import { container } from 'tsyringe'
import { getService } from '../utils/getService.function'
import { KamiqMiddleware } from '../interfaces/kamiqInterface.interface'
import { NextFunction, Request, Response } from 'express'

/**
 * Middleware decorator factory. This decorator adds the provided middleware
 * function to a route handler method.
 *
 * @param {Function} middleware - The middleware function to be added to the route.
 * The function should take three arguments: `(req, res, next)`.
 *
 * @returns {Function} - A decorator function that can be used to decorate a
 * route handler method. When the decorated route is hit, the provided
 * middleware function will be invoked before the route handler.
 *
 * @example
 *
 * ```javascript
 * @Middleware(someMiddleware)
 * @Post('/some-route')
 * handleSomeRoute(@Param('id') id: string) {
 *   // handle route
 * }
 * ```
 */
export function Middleware(middleware: KamiqMiddleware) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metadataService = getService<IMetadataService>('MetadataService')

    const exisitngMiddlewares: Array<any> = metadataService.get(Metadata.MIDDLEWARES, target.constructor.uuid) ?? [] // TODO: Do i need this empty array here as a backup?
    exisitngMiddlewares.unshift({
      handler: target[propertyKey],
      middleware: (req: Request, res: Response, next: NextFunction) => middleware.use(req, res, next),
    })
    metadataService.set(Metadata.MIDDLEWARES, target.constructor.uuid, exisitngMiddlewares)
  }
}
