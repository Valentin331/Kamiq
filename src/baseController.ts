import { NextFunction, Request, Response, Router } from 'express'
import crypto from 'crypto'
import { IMetadataService } from './interfaces/IMetadataService.interface'
import { container } from 'tsyringe'
import { Metadata } from './enums/metadata.enum'
import { asyncRequestHandler } from './middlewares/asyncRequestHandler'
import { getService } from './utils'

export abstract class BaseController {
  uuid: string
  abstract path: string
  router: Router = Router()

  serverMetadataService: IMetadataService

  constructor() {
    this.serverMetadataService = getService<IMetadataService>('MetadataService')
    this.registerRoutes()
    this.uuid = crypto.randomBytes(16).toString('hex') // Generate a unique identifier
  }

  // req?: Request
  // res?: Response

  // /**
  //  * Sends a 200 OK response.
  //  *
  //  * @param {Response} res - The express response object
  //  * @param {any} data - The data to send with the response
  //  */
  // ok(res: Response, data: any) {
  //   res.status(200).json({ data: data })
  // }

  // /**
  //  * Sends a 201 Created response.
  //  *
  //  * @param {Response} res - The express response object
  //  * @param {any} data - The data to send with the response
  //  */
  // created(res: Response, data: any) {
  //   res.status(201).json({ data: data })
  // }

  // /**
  //  * Sends a 204 No Content response.
  //  *
  //  * @param {Response} res - The express response object
  //  */
  // noContent(res: Response) {
  //   res.status(204).end()
  // }

  // /**
  //  * Sends a 400 Bad Request response.
  //  *
  //  * @param {Response} res - The express response object
  //  * @param {string} message - The error message to send with the response
  //  */
  // badRequest(res: Response, message: string) {
  //   res.status(400).json({ error: message })
  // }

  // /**
  //  * Sends a 404 Not Found response.
  //  *
  //  * @param {Response} res - The express response object
  //  * @param {string} message - The error message to send with the response
  //  */
  // notFound(res: Response, message: string = 'Resource not found') {
  //   res.status(404).json({ error: message })
  // }

  // /**
  //  * Sends a 500 Internal Server Error response.
  //  *
  //  * @param {Response} res - The express response object
  //  * @param {string} message - The error message to send with the response
  //  */
  // internalServerError(res: Response, message: string = 'Internal server error') {
  //   res.status(500).json({ error: message })
  // }

  protected registerRoutes() {
    const routes: Array<any> = this.serverMetadataService.get(Metadata.ROUTES, (this.constructor as any).uuid) ?? []
    const parameters: Array<any> = this.serverMetadataService.get(Metadata.PARAMETERS, (this.constructor as any).uuid) ?? []
    const middlewares: Array<any> = this.serverMetadataService.get(Metadata.MIDDLEWARES, (this.constructor as any).uuid) ?? []
    const guards: Array<any> = this.serverMetadataService.get(Metadata.GUARDS, (this.constructor as any).uuid) ?? []

    routes.forEach((route: any) => {
      const handlerParameters = parameters
        .filter((p) => p.propertyKey === route.handler.name)
        .sort((a, b) => a.parameterIndex - b.parameterIndex)
      const routeMiddlewares = middlewares.filter((m) => m.handler === route.handler).map((m) => m.middleware)
      const guardMiddlewares = guards.filter((m) => m.handler === route.handler).map((m) => m.guardMiddleware)
      ;(this.router as any)[route.method](
        route.path,
        guardMiddlewares,
        routeMiddlewares,
        asyncRequestHandler((req: Request, res: Response, next: NextFunction): Promise<any> => {
          const args = handlerParameters.map((p) => p.getValue(req, res, p.arg))
          return Promise.resolve(
            route.handler.apply(
              { ...this },
              [...args],
            ),
          )
        }),
      )
    })
  }
}
