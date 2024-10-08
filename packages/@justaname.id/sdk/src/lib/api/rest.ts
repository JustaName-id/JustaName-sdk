import { controlledAxiosPromise, justANameInstance } from './axiosController';
import { Routes, ROUTES } from './routes';
import qs from 'qs';
import { InvalidConfigurationException } from '../errors';

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

export const restCall = <
  T extends keyof ROUTES,
  K extends 'GET' | 'POST',
  U extends ROUTES[T]['request'],
  V extends ROUTES[T]['headers']
>(
  route: T,
  method: K,
  request: U,
  headers?: V
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

// Function overload when headers are not provided
export function assertRestCall<
  T extends keyof ROUTES,
  K extends 'GET' | 'POST',
  U extends Partial<ROUTES[T]['request']>
>(
  route: T,
  method: K,
  request: U,
  headers?: undefined
): <R extends Array<keyof Partial<ROUTES[T]['request']>>>(
  requiredFields: R
) => Promise<ROUTES[T]['response']>;

// Function overload when headers are provided
export function assertRestCall<
  T extends keyof ROUTES,
  K extends 'GET' | 'POST',
  U extends Partial<ROUTES[T]['request']>,
  V extends Partial<ROUTES[T]['headers']>
>(
  route: T,
  method: K,
  request: U,
  headers: V
): <
  R extends Array<keyof Partial<ROUTES[T]['request']>>,
  RO extends Array<keyof Partial<ROUTES[T]['headers']>>
>(
  requiredFields: R,
  requiredHeaders: RO
) => Promise<ROUTES[T]['response']>;

// Function implementation
export function assertRestCall<
  T extends keyof ROUTES,
  K extends 'GET' | 'POST',
  U extends Partial<ROUTES[T]['request']>,
  V extends Partial<ROUTES[T]['headers']> | undefined
>(
  route: T,
  method: K,
  request: U,
  headers?: V
) {
  return (
    requiredFields: Array<keyof Partial<ROUTES[T]['request']>>,
    requiredHeaders?: Array<keyof Partial<ROUTES[T]['headers']>>
  ): Promise<ROUTES[T]['response']> => {
    const missingFields = requiredFields.filter(field => !request[field]);
    if (missingFields.length) {
      throw InvalidConfigurationException.missingParameters(missingFields.map(field => field.toString()));
    }

    if (headers && requiredHeaders) {
      const missingHeaders = requiredHeaders.filter(
        header => !headers[header]
      );
      if (missingHeaders.length) {
        throw InvalidConfigurationException.missingHeaders(missingHeaders.map(header => header.toString()));
      }
    } else if (requiredHeaders && requiredHeaders.length > 0) {
      throw InvalidConfigurationException.missingHeaders(requiredHeaders.map(header => header.toString()));
    }

    return restCall(route, method, request, headers);
  };
}
export default {
  restCall,
  assertRestCall
}