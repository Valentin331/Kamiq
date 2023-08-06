import { NextFunction, Request, Response } from "express";

export interface KamiqMiddleware {
    use(req: Request, res: Response, next: NextFunction): any;
  }