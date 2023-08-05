/**
 * `HttpResponseCode` is an enumeration of HTTP response status codes.
 * This enum is used when defining the HTTP response code for an operation.
 * It includes a range of status codes for successful requests, client errors, and server errors.
 *
 * @enum {number}
 */
export enum HttpResponseCode {
    // Successful responses
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
  
    // Client error responses
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
  
    // Server error responses
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
  }