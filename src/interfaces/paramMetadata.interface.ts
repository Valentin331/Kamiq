import { GetValueFunction } from "../types"

/**
 * Interface for metadata for a single route parameter.
 */
export interface ParamMetadata {
  propertyKey: string
  parameterIndex: number
  getValue: GetValueFunction
  arg?: any
}
