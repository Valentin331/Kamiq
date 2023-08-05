import { HttpMethod } from '../../enums'
import { RouteFactory } from '../../utils'

/**
 * The `Delete` decorator is a route handler decorator that is used to map DELETE requests to a specific path.
 *
 * @param {string} path - The path to map the DELETE request to
 * @returns {Function} The decorator function
 */
export function Delete(path: string) {
  return RouteFactory(path, HttpMethod.Delete)
}
