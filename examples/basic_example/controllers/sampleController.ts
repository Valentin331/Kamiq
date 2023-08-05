import { BaseController, Get } from "kamiq";

export class SampleController extends BaseController {
    path = '/ping'

    // @ts-ignore
    @Get('/test')
    ping() {
        // @ts-ignore
        this.ok('pong')
    } 
}