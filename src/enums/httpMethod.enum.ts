/**
 * `HttpMethod` is an enumeration of HTTP methods, represented as strings.
 * This enum is used when defining the HTTP method for a route in the `RouteFactory` function.
 * Currently, it includes the methods 'get', 'post', 'put', and 'delete'.
 *
 * @enum {string}
 */
export enum HttpMethod {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
  }