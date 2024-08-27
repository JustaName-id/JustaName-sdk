import { controlledAxiosPromise, justANameInstance } from './axiosController';
import { Routes, ROUTES } from './routes';
import qs from 'qs';

/**
 * Makes a REST call to the JustaName API.
 * @typeparam T - The type of the route.
 * @param route - The route of the API.
 * @param method - The method of the API.
 * @param request - The request of the API.
 * @param headers - The headers of the API.
 * @returns The promise of the data.
 */

/**
 * Defines the types for API request headers.
 */
type HeaderTypes = {
  'x-api-key': string | undefined;
  'x-message': string | undefined;
  'x-signature': string | undefined;
  'x-address': string | undefined;
};

/**
 * Makes a REST call to the JustaName API, dynamically handling the request based on
 * the specified route, method, and request data. Supports optional customization
 * of headers.
 * 
 * @typeparam T - The type of the route, inferred from the `ROUTES` type to ensure
 *                type safety for the route, request, and response objects.
 * @param route - The route of the API, which determines the endpoint to be called.
 * @param method - The HTTP method (e.g., 'GET', 'POST') for the request.
 * @param request - The request payload or parameters, structured according to the
 *                  route's expected input.
 * @param headers - Optional. Additional headers to be sent with the request. Supports
 *                  'x-api-key', 'x-message', 'x-signature', and 'x-address'. 
 * @returns A Promise resolved with the response data of the specified type. The promise
 *          is controlled by `controlledAxiosPromise` to manage API call success and failure
 *          states effectively.
 */
export const restCall = <T extends keyof ROUTES>(
  route: T,
  method: 'GET' | 'POST',
  request: ROUTES[T]['request'],
  headers?: ROUTES[T]['headers']
): Promise<ROUTES[T]['response']> => {

  const currentHeaders:  HeaderTypes = {
    'x-api-key': undefined,
    'x-message': undefined,
    'x-signature': undefined,
    'x-address': undefined,
  }

  if(headers){
    if ('xApiKey' in headers) {
      currentHeaders['x-api-key'] = headers.xApiKey as string;
    }

    if('xMessage' in headers){
      currentHeaders['x-message'] = headers['xMessage'].replace(/\n/g, '\\n') as string;
    }

    if('xSignature' in headers){
      currentHeaders['x-signature'] = headers['xSignature'] as string;
    }

    if('xAddress' in headers){
      currentHeaders['x-address'] = headers['xAddress'] as string;
    }

  }


  return controlledAxiosPromise<ROUTES[T]['response']>(
    justANameInstance.request({
      url: Routes[route],
      method,
      params: method === 'GET' ? request : undefined,
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
      data: method === 'POST' ? request : undefined,
      headers: currentHeaders
    })
  )
}

export default {
  restCall
}