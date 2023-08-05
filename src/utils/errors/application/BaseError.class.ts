/**
 * BaseError is a general-purpose error class that extends the built-in Error class.
 * It adds a statusCode property for HTTP status codes.
 */
export class BaseError extends Error {
    statusCode: number
  
    constructor(statusCode: number, message: string) {
      super(message)
  
      Object.setPrototypeOf(this, new.target.prototype)
      this.name = Error.name
      this.statusCode = statusCode
      Error.captureStackTrace(this)
    }
  }