// TODO: make this jsdoc description more elaborate

import { Request } from 'express'

/**
 * Guard interface.
 */
export interface GuardFunction {
  (req: Request): boolean | Promise<boolean>
}
