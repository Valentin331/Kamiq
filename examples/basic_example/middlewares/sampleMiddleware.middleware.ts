import { Request, Response, NextFunction } from "express";
import { KamiqMiddleware } from "kamiq/interfaces/kamiqInterface.interface";

const log = console.log

export class MySampleMiddleware implements KamiqMiddleware {
    private readonly ignore: boolean;

    constructor(ignore: boolean) {
        this.ignore = ignore;
      }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        if (this.ignore) next() 

        log('sample middleware hit!')
        // Modifying the request object:
        // @ts-ignore
        req.something = 'this is nice'
        next()
    }

}