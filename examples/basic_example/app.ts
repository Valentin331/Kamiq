import 'reflect-metadata'
import { Server } from 'kamiq'

import { SampleController } from './controllers/sampleController'
import { DefaultErrorHandler, DefaultRequestLogger } from 'kamiq/middlewares'

// Setting the server with the initial config object
const serverWithInitalConfig = new Server({
  port: 8001,
  controllers: [SampleController],
  cors: true,
  jsonBodyParser: true,
})

// Setting the server without any config
const server = new Server()

server.setPort(8001)
server.useJsonBodyParser(true)
server.useController(SampleController)
server.useCors(true)
// @ts-ignore
server.setGlobalRequestLogger(new DefaultRequestLogger())
server.setGlobalErrorHandler(new DefaultErrorHandler(true))

// server.setPort(5236203) // -> this will error!

server.start()
