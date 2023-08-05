import { createParamDecorator } from "../../utils";
import { Request, Response } from "express";

/**
 * The `Query` decorator is used to extract a specific query parameter from the incoming HTTP request.
 * It uses the `createParamDecorator` function to achieve this.
 * The decorator will return the value of the query parameter specified.
 *
 * @param {any} arg - The name of the query parameter to extract from the request
 * @returns {Function} The decorator function
 */
export const Query = createParamDecorator((req: Request, res: Response, arg: any) => req.query[arg])