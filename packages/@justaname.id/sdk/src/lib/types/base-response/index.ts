/**
 * Represents the Response Error type.
 * @typeparam T - The type to determine whether it is null or not.
 */

type ErrorType<T> = T extends null ? string : null;

/**
 * Represents the Base Response type of JustaName API.
 * @typeparam T - The type of the data to be returned.
 */
export interface BaseResponse<T> {
  statusCode: number;
  result: {
    data: T extends null ? null : T;
    error: ErrorType<T>;
  };
}
