import { createParamDecorator } from "../../utils";
import { Request, Response } from "express";

/**
 * The Res decorator is a function that can be used to inject the Response object 
 * into a method parameter within a class route handler.
 *
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {any} arg - An optional argument that can be passed to the decorator.
 * @returns {Response} - The Express response object.
 * 
 * @example
 * class SomeController {
 *   @Get('/')
 *   someRouteHandler(@Res() res: Response) {
 *     // Now you have access to res within this method
 *   }
 * }
 */
export const Res = createParamDecorator((req: Request, res: Response, arg: any) => (res))