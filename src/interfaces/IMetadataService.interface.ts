import { Metadata } from '../enums'
import { GuardMetadata } from './guardMetadata.interface'
import { MiddlewareMetadata } from './middlewareMetadata.interface'
import { ParamMetadata } from './paramMetadata.interface'
import { RouteMetadata } from './routeMetadata.interface'

/**
 * `IMetadataService` interface.
 * Provides a contract for a service that is responsible for managing
 * metadata associated with routes, parameters, middleware, and guards.
 * The metadata is stored in Maps, with each map having a string key
 * (representing a unique identifier for a controller) and an array of
 * a specific metadata type as its value.
 *
 * The `set` and `get` methods are used to set and get metadata from these maps.
 */
export interface IMetadataService {
  ROUTE_METADATA: Map<string, Array<RouteMetadata>>
  PARAM_METADATA: Map<string, Array<ParamMetadata>>
  MIDDLEWARE_METADATA: Map<string, Array<MiddlewareMetadata>>
  GUARD_METADATA: Map<string, Array<GuardMetadata>>
  set(map: Metadata, key: string, payload: Array<any>): void
  get(map: Metadata, key: string): Array<any>
}
