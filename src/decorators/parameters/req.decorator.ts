import { createParamDecorator } from "../../utils";
import { Request, Response } from "express";

/**
 * The Req decorator is a function that can be used to inject the Request object 
 * into a method parameter within a class route handler.
 *
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {any} arg - An optional argument that can be passed to the decorator.
 * @returns {Request} - The Express request object.
 * 
 * @example
 * class SomeController {
 *   @Get('/')
 *   someRouteHandler(@Req() req: Request) {
 *     // Now you have access to req within this method
 *   }
 * }
 */
export const Req = createParamDecorator((req: Request, res: Response, arg: any) => (req))