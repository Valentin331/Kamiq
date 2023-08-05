import { GuardOptions } from "../interfaces"
import { GuardFunction } from "../interfaces"
import { NextFunction, Request, Response } from "express"
import { container } from "tsyringe"
import { IMetadataService } from "../interfaces"
import { Metadata } from "../enums"
import { getService } from "../utils/getService.function"

/**
 * `Guard` decorator is used to add middleware that validates whether the current request should be allowed to proceed.
 * This is typically used for things like authorization.
 * The `guardMiddleware` provided should be a function that takes in the Express request, response, and next function,
 * and returns a Promise that resolves to a boolean. If the Promise resolves to `true`, the request is allowed to proceed.
 * If it resolves to `false`, a 403 Forbidden response is sent.
 *
 * @param {Guard} guardMiddleware - A function that takes in the Express request, response, and next function, and returns a Promise that resolves to a boolean.
 * @returns {Function} The decorator function
 */
export function Guard(guardMiddleware: GuardFunction, options?: GuardOptions) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      
      const metadataService = getService<IMetadataService>('MetadataService')

      const existingGuardMiddlewares: Array<any> = metadataService.get(Metadata.GUARDS, target.constructor.uuid) ?? []
      existingGuardMiddlewares.push({
        handler: target[propertyKey],
        guardMiddleware: async (req: Request, res: Response, next: NextFunction) => {
          let allowed: boolean
          if (options && options.ignore) {
            allowed = true
          } else {
            allowed = await guardMiddleware(req)
          }
  
          if (allowed) {
            next()
          } else {
            // TODO: Standardize this error, what to send here?
            res.status(403).send('Forbidden') // or another appropriate error handling
          }
        },
      })
      metadataService.set(Metadata.GUARDS, target.constructor.uuid, existingGuardMiddlewares)
    }
  }