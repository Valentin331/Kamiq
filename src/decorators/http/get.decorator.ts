import { HttpMethod } from '../../enums'
import { RouteFactory } from '../../utils'

/**
 * The `Get` decorator is a route handler decorator that is used to map GET requests to a specific path.
 *
 * @param {string} path - The path to map the GET request to
 * @returns {Function} The decorator function
 */
export function Get(path: string) {
    return RouteFactory(path, HttpMethod.Get)
  }