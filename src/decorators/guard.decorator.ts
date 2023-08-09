import { GuardOptions, KamiqGuard } from "../interfaces"
import { GuardFunction } from "../interfaces"
import { NextFunction, Request, Response } from "express"
import { container } from "tsyringe"
import { IMetadataService } from "../interfaces"
import { Metadata } from "../enums"
import { getService } from "../utils/getService.function"
import { executeGuardHandler } from "../utils/guards/executeGuardHandler.function"

// TODO: Write description.
export function Guard(guardMiddleware: KamiqGuard, options?: GuardOptions) { // TODO: Options type
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      
      const metadataService = getService<IMetadataService>('MetadataService')

      const existingGuardMiddlewares: Array<any> = metadataService.get(Metadata.GUARDS, target.constructor.uuid) ?? []
      existingGuardMiddlewares.unshift({
        handler: target[propertyKey],
        guardMiddleware: async (req: Request, res: Response, next: NextFunction) => {
          await executeGuardHandler(guardMiddleware, options, req, res, next)
        },
      })
      metadataService.set(Metadata.GUARDS, target.constructor.uuid, existingGuardMiddlewares)
    }
  }