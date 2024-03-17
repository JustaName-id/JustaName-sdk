import { ApiKeyHeaders } from '../headers';
import { IResponse, IRoute } from '../common';

export interface ApiKeyResponse extends  IResponse {
  id: string;

  name: string;

  key: string;

  workspaceId: string;

  creatorId: string;
}

export interface ApiKeyRoute extends IRoute {
  request: NonNullable<unknown>;
  response: ApiKeyResponse;
  headers: ApiKeyHeaders
}