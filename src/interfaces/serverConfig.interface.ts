import { BaseController } from "../baseController"

/**
 * The `ExpressServerConfig` interface describes the configuration options for setting up an Express server.
 */
export interface ServerConfig {
    /**
     * An array of controller classes that should be registered with the Express server. Each controller class should be a subclass of `BaseController`.
     */
    controllers: Array<new () => BaseController>
  
    /**
     * The port number the server should listen on. If not provided, the default is 3001.
     */
    port?: number
  
    /**
     * Whether to use the `express.json()` and `express.urlencoded()` middleware for parsing JSON and URL-encoded bodies. If not provided, the default is false.
     */
    jsonBodyParser?: boolean
  
    /**
     * An optional configuration object for the CORS middleware. If provided, the server will use this
     * configuration to set up CORS. The object can include properties such as `origin`, `methods`,
     * `allowedHeaders`, etc. to control the CORS behavior. If not provided, the server will use
     * default CORS settings.
     */
    cors?: boolean
  
    /**
     * A string that will be prefixed to all aplicaiton routes.
     * Example: `${prefix}/some/route`
     */
    routesPrefix?: string // TODO: To be implemented.
  
    /**
     * `disableErrorMiddleware` will disable the default error handling middleware that's enabled by default. This
     *  middleware catches all thrown errors and responds to the client with the `ErrorResponse` interface. Any unhandled
     * exception will hide sensitive data and return a generic error type.
     */
    disableErrorMiddleware?: boolean
  }