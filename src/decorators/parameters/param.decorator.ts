import { createParamDecorator } from "../../utils";
import { Request, Response } from "express";

/**
 * The `Param` decorator is used to extract a specific route parameter from the incoming HTTP request.
 * It uses the `createParamDecorator` function to achieve this.
 * The decorator will return the value of the parameter specified.
 *
 * @param {any} arg - The name of the parameter to extract from the request
 * @returns {Function} The decorator function
 */
export const Param = createParamDecorator((req: Request, res: Response, arg: any) => req.params[arg])