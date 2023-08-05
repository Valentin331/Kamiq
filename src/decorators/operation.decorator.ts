import { OperationResult } from "../interfaces/operationResult.interface"

/**
 * `Operation` decorator is used to wrap a method within a service class with try-catch logic.
 * It transforms the method such that it now returns a promise that either resolves with an object 
 * containing a `success` property set to `true` and a `data` property containing the original method's 
 * return value, or an object with a `success` property set to `false` and an `error` property containing 
 * the error that was thrown.
 * This decorator should be used in a service class, decorating methods that perform some operation and 
 * return a promise.
 *
 * @returns {Function} The decorator function that alters the descriptor of the method it's applied to.
 */
export function Operation() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value
  
      descriptor.value = async function (...args: any[]): Promise<OperationResult<any>> { 
        try {
          const data = await originalMethod.apply(this, args)
          return {
            success: true,
            data,
          }
        } catch (error) {
          return {
            success: false,
            // @ts-ignore
            error,
          }
        }
      }
      return descriptor
    }
  }
  