/**
 * The `ApiResponseSuccessfull` interface represents the structure of a successful API response.
 * It is a generic interface, where `ResponseData` represents the type of the data that the API returns in the response.
 * The `response` property is always 'successfull', indicating the request was processed successfully.
 * The `data` property contains the actual data returned by the API.
 *
 * @interface ApiResponseSuccessfull
 *
 * @template ResponseData - The type of the data that the API returns in the response.
 *
 * @property {string} response - Indicates the status of the API response. Always 'successfull' for this interface.
 *
 * @property {ResponseData} data - The actual data returned by the API. The type of `data` is determined by `ResponseData`.
 */
export interface ApiResponseSuccessfull<ResponseData> {
  // TODO: Make this into a function that can be provided on server factory.
  response: 'successfull'
  data: ResponseData
}
