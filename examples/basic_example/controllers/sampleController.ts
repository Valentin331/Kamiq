import { BaseController, Get, Req, Post, Res } from "kamiq";

export class SampleController extends BaseController {
    path = '/ping'

    @Post('/test')
    ping(@Req() req: Request, @Res() res: Response) {
        console.log('request object:', req.body)
        // @ts-ignore
        // this.ok('pong')
        res.send('hello, client!')
    } 
}