import { Metadata } from "../../enums"
import { IMetadataService } from "../../interfaces"
import { container } from "tsyringe"
import { GetValueFunction } from "../../types"
import { getService } from "../getService.function"

/**
 * Creates a parameter decorator factory. A parameter decorator is a function that
 * can be used to decorate a parameter of a method. When the decorated method is invoked,
 * the decorator function is called with the HTTP request and response objects,
 * and the argument passed to the decorator. The decorator function should extract
 * the desired value from the request and return it.
 *
 * @param {GetValueFunction} getValue - A function that takes the HTTP request and
 * response objects, and the argument passed to the decorator, and returns the desired
 * value. This value is then passed to the decorated method parameter.
 *
 * @returns {Function} - A decorator function that can be used to decorate a method parameter.
 *
 * @throws {TypeError} - Throws an error if `getValue` is not a function.
 *
 * @example
 *
 * ```javascript
 * const Param = createParamDecorator((req, res, arg) => req.params[arg]);
 *
 * class SomeController {
 *   @Get('/some-route/:id')
 *   handleSomeRoute(@Param('id') id: string) {
 *     // handle route
 *   }
 * }
 * ```
 */
export function createParamDecorator(getValue: GetValueFunction) {
    if (typeof getValue !== 'function') {
      throw new TypeError('Expected getValue to be a function')
    }
    return function (arg?: any) {
      return function (target: any, propertyKey: string, parameterIndex: number) {
        const metadataService = getService<IMetadataService>('MetadataService')
        const existingParameters: Array<any> = metadataService.get(Metadata.PARAMETERS, target.constructor.uuid) ?? []
        existingParameters.push({
          propertyKey,
          parameterIndex,
          getValue,
          arg,
        })
        metadataService.set(Metadata.PARAMETERS, target.constructor.uuid, existingParameters)
      }
    }
  }