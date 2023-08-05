import { HttpMethod } from '../../enums'
import { RouteFactory } from '../../utils'

/**
 * The `Post` decorator is a route handler decorator that is used to map POST requests to a specific path.
 *
 * @param {string} path - The path to map the POST request to
 * @returns {Function} The decorator function
 */
export function Post(path: string) {
    return RouteFactory(path, HttpMethod.Post)
  }