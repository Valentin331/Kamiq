import { Request, Response } from "express";

/**
 * `GetValueFunction` is a type definition for a function that takes in an Express
 * `Request` object, `Response` object, and an optional argument. The function should
 * use these inputs to extract a specific value from the request and return it.
 * This type is used in the creation of parameter decorators for controller methods.
 *
 * @typedef GetValueFunction
 * @type {function}
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {any} arg - An optional argument used to provide additional information to the function
 * @returns {any} The extracted value from the request
 */
export type GetValueFunction = (req: Request, res: Response, arg: any) => any