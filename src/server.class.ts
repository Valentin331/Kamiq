import { IMetadataService } from './interfaces/IMetadataService.interface'
import { GuardMetadata } from './interfaces/guardMetadata.interface'
import { ParamMetadata } from './interfaces/paramMetadata.interface'
import { RouteMetadata } from './interfaces/routeMetadata.interface'
import { ServerConfig } from './interfaces/serverConfig.interface'
import cors from 'cors'
import express, { Express } from 'express'
import { MetadataService } from './metadata.service'
import { defaultErrorHandler } from './middlewares'
import { container } from 'tsyringe'
import { KamiqError, getService } from './utils'
import * as KamiqErrors from './utils/errors/framework/kamiqErrors'
import { BaseController } from './baseController'
import chalk from 'chalk'
import boxen from 'boxen'

// Register the metadata service at the top level of the module.
container.register('MetadataService', { useClass: MetadataService })

const DEFAULT_PORT = 3001

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

  public constructor(config?: ServerConfig) {
    this.metadataService = getService<IMetadataService>('MetadataService')

    this.server = express()

    if (config) {
      if (config.controllers.length === 0) throw new KamiqError('ServerConfigurationError', 'No controllers provided.') // TODO: Abstract to an error class.

      if (!config.port) config.port = DEFAULT_PORT
      if (!config.jsonBodyParser) config.jsonBodyParser = false
      if (!config.cors) config.cors = true

      this.config = config

      this.server.set('port', config.port)

      if (config.cors) this.server.use(cors())

      if (config.jsonBodyParser) {
        this.server.use(express.json())
        this.server.use(express.urlencoded({ extended: true }))
      }
    } else {
      this.config = {
        controllers: [],
        port: DEFAULT_PORT,
      }
    }
  }

  /**
   * Registers the controller classes with the server.
   */
  private registerControllers() {

    if (this.config.controllers.length === 0) throw new KamiqError( // TODO: Abstract to an error class.
      'ServerConfigurationError',
      'No controllers are provided.',
      'Check your server configuration - Kamiq found no provided controllers. Please provide at least one valid controller class.',
    )
    this.config.controllers.forEach((ControllerClass) => {

      const controller = new ControllerClass()
      this.server.use(controller.path, controller.router)
    })
  }

  /**
   * Enable or disable parsing requests with JSON data. Uses express.js JSON body parser.
   * @param value boolean
   */
  useJsonBodyParser(value: boolean): void {
    this.config.jsonBodyParser = value
  }

  /**
   * Enable or disable using expres.js CORS middleware.
   * @param value boolean
   */
  useCors(value: boolean): void {
    this.config.cors = value
  }

  /**
   * Registers a new controller with the server.
   * @param {new () => BaseController} controllerClass - The class of the controller to be added.
   * @throws {KamiqError} Throws an error if the provided controller class is already registered.
   * @returns {void}
   */
  useController(controllerClass: new () => BaseController): void {
    if (this.config.controllers.includes(controllerClass)) {
      throw new KamiqError( // TODO: Abstract to an error class. 
        'ServerConfigurationError',
        'Provided controller class is already registered.',
        'Provided controller class is already registered. Check your server configuration - no need to include the same controller multiple times.',
      )
    }
    this.config.controllers.push(controllerClass)
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
        `Please check your server configuration.`,
      )
    }
    this.config.port = port
  }

  /**
   * The `getPort` method is used to get the current port number of the server.
   *
   * @returns {number} The current port number.
   */
  getPort(): any {
    return this.config.port
  }

  /**
   * Sets the error handler middleware that will process all controller-level caught errors.
   * @param middleware
   */
  setErrorHandlerMiddleware(middleware: any): void {
    // TODO: implement type
    this.config.errorMiddleware = middleware
  }

  private getServerStartMessage() {
    const boxenOptions = {
      padding: 1,
      margin: 1,
      borderColor: 'blue',
      title: 'Kamiq',
      titleAlignment: 'left',
    }

    const message = 
      '\n'
      + `Server is listening on  http://localhost:${this.config.port}` 

      // @ts-ignore
    return boxen(message, boxenOptions)
  }

  /**
   * Starts the server, making it listen on the configured port.
   */
  public start() {
    // TODO: Refactor this part into a function.
    // configure server
    this.server.set('port', this.config.port)
    if (this.config.cors) this.server.use(cors())
    if (this.config.jsonBodyParser) {
      console.log('calldwad')
      this.server.use(express.json())
      this.server.use(express.urlencoded({ extended: true }))
    }
    this.registerControllers() // Should this be here?

    // start the server
    this.server.listen(this.config.port, () => {
      console.log(this.getServerStartMessage())
    })
  }
}
