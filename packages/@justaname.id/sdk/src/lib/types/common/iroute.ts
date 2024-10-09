export interface IRequest {}

export interface IResponse {}

export interface IHeaders {}

export interface EmptyHeaders extends IHeaders {}

export type MakeOptionalProps<T, K extends keyof T> = Omit<T, Extract<keyof T, K>> &
  Partial<Pick<T, Extract<keyof T, K>>>;

export interface IRoute<
  Request extends IRequest = IRequest,
  Response extends IResponse = IResponse,
  Headers extends IHeaders = IHeaders,
  Params extends keyof Request = never,
  OmitParams extends keyof Request = never,
  ExtraParams extends Record<string, any> = {},
> {
  request: Request;
  response: Response;
  headers: Headers;
  params: Omit<MakeOptionalProps<Request, Params>, OmitParams> & ExtraParams;
  route: string;
}