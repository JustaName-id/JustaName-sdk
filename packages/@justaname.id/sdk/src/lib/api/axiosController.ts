import axios, { AxiosError, AxiosPromise } from 'axios';
import { BaseResponse } from '../types';

export function getBaseUrl(dev = false) {
  if (dev) {
    return 'https://api-staging.justaname.id';
  }
  return 'https://api.justaname.id';
}

/**
 * The instance of axios with the base URL of JustaName API.
 */
export const justANameInstance = (dev= false) => axios.create({
  baseURL: getBaseUrl(dev),
});

/**
 * Represents the Controlled Axios Promise type.
 * @typeparam T - The type of the data to be returned.
 */
export type ControlledAxiosPromise<T extends {}> = AxiosPromise<
  BaseResponse<T>
>;

/**
 * Represents the controlled axios promise.
 * @typeparam T - The type of the data to be returned.
 * @param promise
 * @returns The promise of the data.
 */
export const controlledAxiosPromise = <T extends NonNullable<unknown>>(
  promise: ControlledAxiosPromise<T>
): Promise<T> =>
  promise
    .then((res) => {
      if (res.data.result.data === null) {
        throw new Error(res.data.result.error ?? 'Something went wrong');
      }
      return res.data.result.data as T;
    })
    .catch((err: AxiosError<BaseResponse<null>>) => {
      if (err.response) {
        if (err.response.data.result !== null) {
          throw new Error(err.response.data.result.error);
        }
      }
      throw err;
    });
