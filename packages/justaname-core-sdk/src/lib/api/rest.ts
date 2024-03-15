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


type HeaderTypes = {
  'x-api-key': string | undefined;
  'x-message': string | undefined;
  'x-signature': string | undefined;
  'x-address': string | undefined;
};

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
      currentHeaders['x-message'] = headers['xMessage'] as string;
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