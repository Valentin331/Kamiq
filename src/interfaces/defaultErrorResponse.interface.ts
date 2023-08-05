export interface ErrorResponse {
    response: string
    error: {
      type: string
      path: string
      statusCode: number
      message: string
    }
  }