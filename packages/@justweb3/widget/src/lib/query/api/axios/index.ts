import axios, { AxiosError, AxiosPromise } from 'axios';

type ErrorType<T> = T extends null ? string : null;

export interface BaseResponse<T> {
  statusCode: number;
  result: {
    data: T extends null ? null : T;
    error: ErrorType<T>;
  };
}

export function getBaseUrl(dev = false) {
  if (dev) {
    return 'https://api-staging.justaname.id';
  }
  return 'https://api.justaname.id';
}

export const justANameInstance = (backendUrl?: string, dev = false) =>
  axios.create({
    baseURL: backendUrl ?? getBaseUrl(dev),
  });

export type ControlledAxiosPromise<T extends {}> = AxiosPromise<
  BaseResponse<T>
>;

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
