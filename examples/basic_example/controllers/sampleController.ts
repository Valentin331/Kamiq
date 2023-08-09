import { BaseController } from "kamiq";
import { Guard, Middleware, Post, Req, Res } from "kamiq/decorators";
import { MySampleMiddleware } from "../middlewares/sampleMiddleware.middleware";
import { MySampleMiddleware2 } from "../middlewares/sampleMiddleware2.middleware";
import { sampleGuard } from "../guards/sampleGuard.guard";

export class SampleController extends BaseController {
    path = '/ping'

    @Guard(new sampleGuard(), {
        ignore: false
    })
    @Middleware(new MySampleMiddleware(false))
    @Middleware(new MySampleMiddleware2(false))
    @Post('/test')
    ping(@Req() req: Request, @Res() res: Response) {

        // @ts-ignore 
        console.log('the req.something:', req.something)

        console.log('request object:', req.body)

        // @ts-ignore
        // this.ok('pong')
        res.send('hello, client!')
    } 
}