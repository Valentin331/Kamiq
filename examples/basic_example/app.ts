import 'reflect-metadata'
import * as kamiq from 'kamiq'

import { SampleController } from './controllers/sampleController'

// Setting the server with the initial config object
const serverWithInitalConfig = new kamiq.Server({
    port: 3002,
    controllers: [SampleController],
    cors: true,
    jsonBodyParser: true,
})


// Setting the server without any config
const server = new kamiq.Server()

server.setPort(8001)
server.useController(SampleController)
server.useCors(true)
server.useJsonBodyParser(true)
server.setErrorHandlerMiddleware(kamiq.defaultErrorHandler)



// server.setPort(5236203) // -> this will error!

server.start()
