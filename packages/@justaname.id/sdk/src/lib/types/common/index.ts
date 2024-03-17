export type ChainId = 1 | 11155111;

export interface IRequest {}

export interface IResponse {}

export interface IHeaders {}

export interface IRoute {
  request: IRequest;
  response: IResponse;
  headers: IHeaders;
}