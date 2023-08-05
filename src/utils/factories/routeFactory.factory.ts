import { HttpMethod } from "../../enums/httpMethod.enum"
import { Metadata } from "../../enums"
import { IMetadataService } from "../../interfaces"
import { container } from "tsyringe"
import { getService } from "../getService.function"

/**
 * RouteFactory is a decorator factory that maps a class method to a specified HTTP route and method.
 *
 * @param {string} path - The path of the HTTP route.
 * @param {HttpMethod} method - The HTTP method (e.g., GET, POST, PUT, DELETE).
 *
 * @returns {Function} - A decorator function that can be used to decorate a
 * route handler method. The decorated method will be invoked when the specified
 * HTTP route and method are hit.
 *
 * @throws {TypeError} - Throws an error if either path or method are not of type string.
 *
 * @example
 *
 * ```javascript
 * class SomeController {
 *   @RouteFactory('/some-route', HttpMethod.Get)
 *   handleSomeRoute() {
 *     // handle route
 *   }
 * }
 * ```
 */
export function RouteFactory(path: string, method: HttpMethod) {
    if (typeof path !== 'string') {
      throw new TypeError('Expected path to be a string')
    }
    if (typeof method !== 'string') {
      throw new TypeError('Expected method to be a string')
    }
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const metadataService = getService<IMetadataService>('MetadataService')
      const existingRoutes: Array<any> = metadataService.get(Metadata.ROUTES, target.constructor.uuid) ?? []
      existingRoutes.push({
        path,
        method,
        handler: target[propertyKey],
      })
      metadataService.set(Metadata.ROUTES, target.constructor.uuid, existingRoutes)
    }
  }