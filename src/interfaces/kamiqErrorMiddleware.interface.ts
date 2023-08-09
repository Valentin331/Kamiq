import { NextFunction, Request, Response } from "express";

export interface KamiqErrorMiddleware {
    use(err: any, req: Request, res: Response, next: NextFunction): any;
  }