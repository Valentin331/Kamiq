import { Metadata } from './enums/metadata.enum'
import { IMetadataService } from './interfaces/IMetadataService.interface'
import { GuardMetadata } from './interfaces/guardMetadata.interface'
import { MiddlewareMetadata } from './interfaces/middlewareMetadata.interface'
import { ParamMetadata } from './interfaces/paramMetadata.interface'
import { RouteMetadata } from './interfaces/routeMetadata.interface'
import { injectable, singleton } from 'tsyringe'

@singleton()
export class MetadataService implements IMetadataService {
  /**
   * Map to store metadata for all routes in the application.
   * The key is a string representing the unique identifier (UUID) of the controller.
   * The value is an array of RouteMetadata objects, each containing information about a route.
   *
   * @type {Map<string, Array<RouteMetadata>>}
   */
  ROUTE_METADATA: Map<string, Array<RouteMetadata>>

  /**
   * Map to store metadata for all route parameters in the application.
   * The key is a string representing the unique identifier (UUID) of the controller.
   * The value is an array of ParamMetadata objects, each containing information about a route parameter.
   *
   * @type {Map<string, Array<ParamMetadata>>}
   */
  PARAM_METADATA: Map<string, Array<ParamMetadata>>

  /**
   * Map to store metadata for all middleware in the application.
   * The key is a string representing the unique identifier (UUID) of the controller.
   * The value is an array of MiddlewareMetadata objects, each containing information about a middleware.
   *
   * @type {Map<string, Array<MiddlewareMetadata>>}
   */
  MIDDLEWARE_METADATA: Map<string, Array<MiddlewareMetadata>>

  /**
   * Map to store metadata for all guards in the application.
   * The key is a string representing the unique identifier (UUID) of the controller.
   * The value is an array of GuardMetadata objects, each containing information about a guard.
   *
   * @type {Map<string, Array<GuardMetadata>>}
   */
  GUARD_METADATA: Map<string, Array<GuardMetadata>>

  // TOOD: Making this a private constructor may block creating new instances
  // of this class? So that "new ..." will be disallowed? Idk, maybe, should
  // check it out
  constructor() {
    this.ROUTE_METADATA = new Map<string, Array<RouteMetadata>>()
    this.PARAM_METADATA = new Map<string, Array<ParamMetadata>>()
    this.MIDDLEWARE_METADATA = new Map<string, Array<MiddlewareMetadata>>()
    this.GUARD_METADATA = new Map<string, Array<GuardMetadata>>()
  }

  /**
   * Sets the metadata for a specific key in a specific map.
   *
   * @param {Metadata} map - The map in which to set the metadata.
   * @param {string} key - The key for which to set the metadata.
   * @param {Array<any>} payload - The metadata to set.
   */
  set(map: Metadata, key: string, payload: Array<any>): void {
    this[map].set(key, payload)
  }

  /**
   * Gets the metadata for a specific key from a specific map.
   *
   * @param {Metadata} map - The map from which to get the metadata.
   * @param {string} key - The key for which to get the metadata.
   * @returns {Array<any>} The metadata for the specified key, or undefined if no metadata is set for that key.
   */
  get(map: Metadata, key: string): Array<any> {
    return this[map].get(key) as Array<any> // TODO: stupid casting hack!
  }
}
