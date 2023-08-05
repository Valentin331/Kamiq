/**
 * Options for the `Guard` decorator.
 */
export interface GuardOptions {
  /**
    @property {boolean} ignore - If set to `true`, the guard will always allow the request to proceed, regardless of the result of `guardMiddleware`. This can be useful for disabling a guard in certain environments, such as in testing or development. If not provided, defaults to `false`.
    */
  ignore?: boolean
}
