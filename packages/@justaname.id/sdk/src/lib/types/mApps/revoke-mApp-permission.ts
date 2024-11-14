import { IRequest, IRoute, SubnameResponse } from '../common';

export interface RevokeMAppPermissionRequest extends IRequest {
  address: string;
  signature?: string;
  message: string;
}

export interface RevokeMAppPermissionRoute
  extends IRoute<RevokeMAppPermissionRequest, SubnameResponse> {}
