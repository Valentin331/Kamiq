import { createParamDecorator } from "../../utils";
import { Request, Response } from "express";

/**
 * The `Body` decorator is used to extract the entire request body or a specific property from the request body.
 * It uses the `createParamDecorator` function to achieve this.
 * The decorator will return the entire body if no argument is provided, or the value of the property specified.
 *
 * @param {any} arg - The name of the property to extract from the request body. If no argument is provided, the entire body is returned.
 * @returns {Function} The decorator function
 */
export const Body = createParamDecorator((req: Request, res: Response, arg: any) => (arg ? req.body[arg] : req.body))