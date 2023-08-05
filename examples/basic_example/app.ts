import 'reflect-metadata'
import * as kamiq from 'kamiq'

import { SampleController } from './controllers/sampleController'

const server = new kamiq.Server({
    port: 3002,
    controllers: [SampleController],
    cors: true,
    jsonBodyParser: true,
})

server.setPort(5236203) // -> this will error!

server.start()