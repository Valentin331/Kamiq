Kamiq
=====
A lightweight, batteries-included TypeScript framework for [Node.js](https://nodejs.org/en) for building declarative server-side applications with high Express.js interoperability.

## Description
Kamiq is a TypeScript framework for building declarative server-side applications with heavy decorator usage. It uses modern Javascript syntax and is build with [Typescript](https://www.typescriptlang.org/), leveraging all of it's features while making Kamiq very descriptive. It combines object-oriented and functional programming approaches to achieve it's minimal syntax design.

Kamiq is built on top of [Express.js](https://expressjs.com/) and by design offers high interoperability with Express.js, enabling the user to easily port over their existing Express.js code including routes, middlewares and more. It is a batteries-included framework, providing out-of-the-box error handling middlewares, custom prettified errors, response structures, file uploading and more.

<!-- ## Disclaimer!
This project is a personal learning experiment and is not meant to be used for any production or production-like environment. It contains underdeveloped code and is missing a lot of features for it to be suitable for any real-world use. Further development will show where I want to take this project. Currently feel free to use, explore, and offer modifications to the codebase. -->

## Table of Contents
- [Kamiq](#kamiq)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [1. Example of usage](#1-example-of-usage)
    - [1.1. Configuring the server](#11-configuring-the-server)
    - [1.2. Controller and route example](#12-controller-and-route-example)
  - [2. Installation](#2-installation)
    - [2.1. Installing the framework and dependencies](#21-installing-the-framework-and-dependencies)
    - [2.2. Configuring your project](#22-configuring-your-project)
  - [3. Introduction](#3-introduction)
    - [3.1. Getting started](#31-getting-started)
      - [3.1.1. Server class](#311-server-class)
      - [3.1.2. Controllers](#312-controllers)
    - [3.2. Parameters](#32-parameters)
      - [3.2.1. Req (request lifecycle object)](#321-req-request-lifecycle-object)
      - [3.2.2. Res (request lifecycle object)](#322-res-request-lifecycle-object)
      - [3.2.3. Param](#323-param)
      - [3.2.4. Query](#324-query)
      - [3.2.5. Body](#325-body)
    - [3.3. Error handling](#33-error-handling)
    - [3.4. Request Logging](#34-request-logging)
    - [3.5. Middlewares](#35-middlewares)
    - [3.6. Guards](#36-guards)
    - [3.7. Middleware/Guard options](#37-middlewareguard-options)
      - [3.7.1. Ignore](#371-ignore)
    - [3.8. Operations](#38-operations)
    - [3.9. Kamiq errors](#39-kamiq-errors)
  - [Examples](#examples)


## 1. Example of usage

### 1.1. Configuring the server

To configure your server, instantiate an object from the Server class. Use the public functions to set your configuration object and any other properties.

```typescript
import 'reflect-metadata'
import { Server } from 'kamiq'
import { DefaultErrorHandler, DefaultRequestLogger } from 'kamiq/middlewares'

import { SampleController } from './controllers/sampleController'

const server = new Server()

server.setPort(8001)
server.useJsonBodyParser(true)
server.useController(SampleController)
server.useCors(true)
server.setGlobalRequestLogger(new DefaultRequestLogger())
server.setGlobalErrorHandler(new DefaultErrorHandler(true))

server.start()
```

### 1.2. Controller and route example

```typescript
import { BaseController } from "kamiq";
import { Middleware, Post, Req, Res } from "kamiq/decorators";
import { MySampleMiddleware } from "../middlewares/sampleMiddleware.middleware";
import { MySampleMiddleware2 } from "../middlewares/sampleMiddleware2.middleware";

export class SampleController extends BaseController {
    path = '/users' // Base path for the following routes.

    @Guard(new AgencyAuthorizer(), {
        ignore: true // Optional way to ignore a guard (or middleware)
    }) // Guards
    @Middleware(new LogSignInEvent('user')) // Middlewares   
    @Post('/siginin') // Get controller registeres the route with a GET method and handles errors
    ping(@Req() req: Request, @Res() res: Response, @Body() body: IUserSignIn, @Param('userId') userId: string) {

        const { password } = body

        const signIn = AuthService.signIn(userId, password) // Kamiq operation

        if (signIn.error) throw new AuthorizationError(signIn.error) // Picked up by global err handling middleware 

        res.json({ msg: 'success' })
    } 
}
```

## 2. Installation

### 2.1. Installing the framework and dependencies

Firstly, install `reflect-metadata` shim (reqired due to usage of `tsyringe`):

```
npm install reflect-metadata
```

Install the `Kamiq` framework:

```
npm install kamiq
```

### 2.2. Configuring your project

Make sure you have the following settings in your `tsconfig.json`:

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## 3. Introduction

NOTE: This chapter serves as a brief introduction to the workings and principles of Kamiq. Later chapters will eloquetly cover all concepts mentioned here in great detail.

### 3.1. Getting started

#### 3.1.1. Server class

In Kamiq, your application lives in the `server` object. To get started, import and instantiate an object from the Server class in your root file (usually `server.ts` or `app.ts`):

```typescript
import { Server } from 'kamiq'

const server = Server()
```

Use public functions on the server object to configure your server. Let's take a look at the most commonly used:

```typescript
server.setPort(8001) // Sets the port server will listen on
server.useJsonBodyParser(true) // Enables parsing incoming body as JSON
server.useController(SampleController) // use useController() function to bind your controller classes
server.useCors(true) // Use express cors() package
server.setGlobalRequestLogger(new DefaultRequestLogger()) // Set your global request logger middleware
server.setGlobalErrorHandler(new DefaultErrorHandler(true)) // Set your global error handling middleware
```

Run `start()` to make the server listen for incoming requests.

Calling the following function will trigger all neccessary configuration for starting the server, including registering all middlewares and routes and more. Mistakes in the configuration of the server will result in Kamiq throwing a custom Error with suggestions for resolving them. A successfull configuration results in the following result:

```
  ┌ Kamiq ────────────────────────────────────────────┐
  │                                                   │
  │   Server is listening on  http://localhost:8001   │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

#### 3.1.2. Controllers

One property of the server config object we didn't cover is the `controllers` property. This is an array that takes in your controller classes that extend the `BaseController` class. Let's create a new file under `./controllers` and name it `SampleController.controller.ts` with the following contents:

```typescript
import { BaseController } from 'kamiq'

export class SampleController extends BaseController {
    path = '/users'

    @Get('/all')
    getAllUsers() {
        this.ok('users...')
    } 
}
```

Kamiq focuses on heavy decorator use, resulting in highly declarative controller code. Each controller class extends the `BaseController` class that abstracts the route registering logic, along with hanlding middleware and errors (more on this later).

The `path` property is the controller-level path that all routes in this contoller will be prefixed to. The following example route with the handler `getAllUsers()` results in the following path: `/users/all`.

The `Get('/getAllUsers')` decorator registeres the route with the `GET` method. It takes in one string argument which is the route-specific path suffix.

### 3.2. Parameters

To get access to the request data, Kamiq provides you with a few decorators:

#### 3.2.1. Req (request lifecycle object)

Use the `@Req` decorator to inject the express lifecycle `Request` object into your controller handler:

```typescript
@Get('/test')
    ping(@Req() req: Request) {
        log(req.body)
        this.ok('success')
    } 
```

#### 3.2.2. Res (request lifecycle object)

Use the `@Res` decorator to inject the express lifecycle `Response` object into your controller handler:

```typescript
@Get('/test')
    ping(@Res() res: Response) {
        res.send('success')
    } 
```

#### 3.2.3. Param

Use the `@Param` decorator to inject parameters in your controller handler:

```typescript
@Get('/test')
    ping(@Param("userId") userId: string) {
        this.ok(userId)
    } 
```

#### 3.2.4. Query

Use the `@Query` decorator to inject query paramteres in your controller handler:

```typescript
@Get('/test')
    ping(@Query("modifiedType") modifierType: string) {
        this.ok(modifierType)
    } 
```

#### 3.2.5. Body

Use the `@Body` decorator to inject body object in your controller handler:

```typescript
@Get('/test')
    ping(@Body() body: any) {
        this.ok(body)
    } 
```

The `@Body` decorator also takes in a string argument that extracts a specific property from the body object:

```typescript
@Get('/test')
    ping(@Body("userObj") user: any) {
        this.ok(user)
    } 
```

### 3.3. Error handling

By default, all route handlers are async functions, so no need to declare the handler as async. In addition, all routes are wrapped in an `requestErrorHandler` middleware which wraps the handler in a try/catch block.

This gives Kamiq a global error handling middleware you can leverage to handle errors in a single place. Kamiq provides a default `defaultErrorHandler` middleware you can use - or you can easily write your own.

The default error handler responds with this interface:

```typescript
export interface ErrorResponse {
    response: string
    error: {
      type: string
      path: string
      statusCode: number
      message: string
    }
  }
```

Acceptable global error handles implement the `KamiqErrorMiddleware` interface.

A `BaseError` class extends the Node `Error`, making it trivial to write your own custom errors. Simply extend the `BaseError`, add your own logic and due to the fact all route handlers are wrapped in a try/catch block, simply throw your custom Error:

```typescript
@Get('/test')
    ping() {
        
        throw new CustomError("my error message!")

        this.ok('res')
    } 
```

and Kamiq will handle everything for you.

### 3.4. Request Logging

Use the `setGlobalRequestLogger()` function on the `Server()` class to set the request logger middleware.

Use the default `DefaultRequestLogger` middleware which uses `winston` logger library, or write you own. Kamiq loggers implement the `KamiqMiddleware` interface.

The default, while customizable, has the following default format:

```typescript
Wed, 09 Aug 2023 08:30:53 GMT info: POST /ping/test 200 3ms - 200 POST /ping/test - 3ms
```

### 3.5. Middlewares

Custom middlewares can be run by simply using the `Middleware()` decorator on a route:

```typescript
@Middleware(new myCustomMiddleware())
@Get('/test')
    ping() {
        // ...
    } 
```

where `myCustomMiddleware` is a class that implements the `KamiqMiddleware` interface, which wraps the express middleware function in a `use()` function. The said `myCustomMiddleware` might look like this:

```typescript
export class MySampleMiddleware implements KamiqMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        // middleware code...
        return next()
    }
}
```

allowing you to directly port your old Express code to Kamiq.

Middlewares can also accept parameters that you can use in your `use()` function, and even modify the `request` object like so:

```typescript
// Middleware
export class MySampleMiddleware implements KamiqMiddleware {
    private readonly someValue: boolean;

    constructor(someValue: boolean) {
        this.someValue = someValue;
      }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        // Can use someValue to change behavior...

        log('sample middleware hit!')
        // Modifying the request object:
        // @ts-ignore
        req.something = 'this is nice'
        next()
    }
}

// Route
    @Middleware(new MySampleMiddleware(false))
    @Middleware(new MySampleMiddleware2(false))
    @Post('/test')
    ping(@Req() req: Request, @Res() res: Response) {

        // @ts-ignore 
        console.log('the req.something:', req.something)

        console.log('request object:', req.body)

        res.send('hello, client!')
    } 
```

Middlewares can be also chained, where the order of operations are respected:

```typescript
@Middleware(new myCustomMiddleware())
@Middleware(new myCustomMiddleware2())
@Get('/test')
    ping() {
        // ...
    } 
```

### 3.6. Guards

Guards are special middlewares, that must obey the single responsiblity rule. They're intended usecase is to handle authorization and authentication responsiblities. They implement the `KamiqGuard` interface, which takes in the `use()` function which is the request handler that must return a boolean, and a `setError()` function which you can optionally use to set the error type that will be caught in case the guard returns a `false` value. 

Here's how a guard might look:

```typescript
export class sampleGuard implements KamiqGuard {
    use(req: Request, res: Response, next: NextFunction): boolean {
        // your code...
    }

    setError(): Error {
        return new Error('guard stopped execution.')
    }
}  
```

Then we can use it like so:

```typescript
@Guard(new sampleGuard())
@Get('/test')
    ping() {
        // ...
    } 
```

Regardless of middleware order, Guard logic always takeds precedence, therefore is always executed before other middleware functions.

### 3.7. Middleware/Guard options

`Middleware()` and `Guard()` decorators take an optional second argument, an object you can use to modify the handlers behaviour. Here are the avaiable options:

#### 3.7.1. Ignore

Use the `ignore` boolean, which enables you to quickly enable/disable the middleware while developing your application, making it easier to debug/test your routes.

```typescript
 @Guard(new AgencyAuthorizer(), {
        ignore: true // Optional way to ignore a guard (or middleware)
    }) // Guards
    @Post('/siginin') 
    ping(@Req() req: Request, @Res() res: Response) {
        // ...
    } 
```

### 3.8. Operations

Operations are a Kamiq-specific function type that aide with inter-layer communication within your codebase. Let's consider a simple backend architecture, consisting of three layers: presentation, service and data-access layer.

Error handling should be handled at the controller level, making the communication between the layers troublesome, considering any logic may error. Also, this raises the question of how to handle user-invoked errors at sub-controller levels.

Any general function can be an Operation by attaching the `Operation()` decorator to it.

Operation functions are general functions that are wrapped in a try/catch block and have a standardized `OperationResut` return type:

```typescript
export type OperationResult<T> = { success: true; data: T } | { success: false; error: Error }
```


This ensures any `Operation` function will return an object with the `success` property set to `true` if the operation was successfull together with the `data` property. In case of failure, `success` will be `false`, and the `error` property will be returned, making it very simple for the receiver of the result to conditionally handle errors:

```typescript
// Operation function

class MyService {

    @Operation
    static myOperationFunction() {
        throw new Error("oops!")
    }

}

// Operation receiver
function mockControllerFunction() {
    const operationResult = MyService.myOperationFunction()

    // handling the result:
    if (operationResult.error) {
        // handle error case
    }

    const result = operationResult.success
    // continue...
}

```

Tip: Combine service level functions as Operations with the controller-level error handling to create bulletproof controller-service logic.

### 3.9. Kamiq errors

Kamiq offers descriptive, prettified framework-level error handling to make it as responsive and informative as possible. If you make any configuration or definition errors at the framework level, Kamiq will throw it's custom error to help you resolve the problem. Here's an example of such error being thrown, invoked due to a misconfigured `port` variable:

![Kamiq error example](readme_files/kamiq_error_example.png)

Kamiq also handles `unhandledRejection` and `uncaughtException` errors in a similar fasion. All errors are followed with the stack trace of where it was invoked.

## Examples

Take a peek into the `examples` folder, which houses example of using the Kamiq framework. Simply install the dependencies, check the `package.json` for scripts and examine the code.