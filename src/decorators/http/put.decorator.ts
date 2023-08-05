import { HttpMethod } from '../../enums'
import { RouteFactory } from '../../utils'

/**
 * The `Put` decorator is a route handler decorator that is used to map PUT requests to a specific path.
 *
 * @param {string} path - The path to map the PUT request to
 * @returns {Function} The decorator function
 */
export function Put(path: string) {
  return RouteFactory(path, HttpMethod.Put)
}
