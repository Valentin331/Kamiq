import { IMetadataService } from './interfaces/IMetadataService.interface'
import { GuardMetadata } from './interfaces/guardMetadata.interface'
import { ParamMetadata } from './interfaces/paramMetadata.interface'
import { RouteMetadata } from './interfaces/routeMetadata.interface'
import { ServerConfig } from './interfaces/serverConfig.interface'
import cors from 'cors'
import express, { Express } from 'express'
import { MetadataService } from './metadata.service'
import { errorResponse } from './middlewares/defaultErrorHandler.middleware'
import { container } from 'tsyringe'
import { getService } from './utils'
import *  as KamiqErrors from './utils/errors/framework/kamiqErrors'

// Register the metadata service at the top level of the module.
container.register("MetadataService", { useClass: MetadataService });

export class Server {
  /**
   * The Express application instance. It's used to configure and start the server.
   */
  private server: Express
  /**
   * The configuration options for the server. It's used to set up the server's port,
   * whether to use body parsing middleware, and which controllers to register.
   */
  private config: ServerConfig

  /**
   * a metadata object serving as a service for managing metadata for the framework.
   * Contains metadata maps for:
   * - routes
   * - parameters
   * - middlewares
   * - guards
   * Contains getters and setters along with helper functions to help manage data.
   */
  private metadataService: IMetadataService 


  constructor(config: ServerConfig) {
    this.metadataService = getService<IMetadataService>('MetadataService')

    if (config.controllers.length === 0) throw new Error('Cannot set up express server: no controllers provided.')
    if (!config.port) config.port = 3001
    if (!config.jsonBodyParser) config.jsonBodyParser = false
    if (!config.cors) config.cors = true

    this.config = config
    this.server = express()

    this.server.set('port', config.port)

    if (config.cors) this.server.use(cors())

    if (config.jsonBodyParser) {
      this.server.use(express.json())
      this.server.use(express.urlencoded({ extended: true }))
    }

    this.registerControllers()

    if (!config.disableErrorMiddleware) this.addDefaultErrorHandlerMiddleware()
  }

  /**
   * Registers the controller classes with the server.
   */
  private registerControllers() {
    this.config.controllers.forEach((ControllerClass) => {
      const controller = new ControllerClass()
      this.server.use(controller.path, controller.router)
    })
  }
  
  /**
     * The `setPort` method is used to set the port number for the server.
     * It checks if the provided port number is within the valid range for TCP/IP ports (1-65535).
     * If the provided port number is not within this range, it throws an error.
     *
     * @param {number} port - The port number to be set.
     * @throws {Error} Will throw an error if the port number is not within the range 1-65535.
     */
  setPort(port: number) {
    if (port < 1 || port > 65535) {
      throw new KamiqErrors.InvalidArgumentError(
        `Port must be a number between 1 and 65535. Provided port is ${port}`,
        `Please check your server configuration.`
      );
    }
    this.config.port = port;
}

/**
 * The `getPort` method is used to get the current port number of the server.
 *
 * @returns {number} The current port number.
 */
getPort(): any {
    return this.config.port;
}

  /**
   * The `addDefaultErrorHandlerMiddleware` method is a private method that adds a default error handler middleware to the Express.js application.
   * This middleware is designed to catch all unhandled errors that occur during the processing of a request and generate an appropriate HTTP response.
   *
   * @private
   * @function addDefaultErrorHandlerMiddleware
   *
   * @returns {void}
   */
  private addDefaultErrorHandlerMiddleware() {
    this.server.use(errorResponse)
  }

  /**
   * Starts the server, making it listen on the configured port.
   */
  public start() {
    this.server.listen(this.config.port, () => {
      console.log(`Server is listening on port ${this.config.port}`)
    })
  }
}
