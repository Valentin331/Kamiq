/**
 * Interface to describe the metadata stored for each route.
 *
 * @interface
 * @property {string} path - The path of the route.
 * @property {string} method - The HTTP method of the route.
 * @property {Function} handler - The function to handle requests to the route.
 */
export interface RouteMetadata {
  path: string
  method: string
  handler: Function
}
