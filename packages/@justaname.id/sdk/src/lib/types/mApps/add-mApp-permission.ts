import { IRequest, IRoute, SubnameResponse } from '../common';


export interface AddMAppPermissionRequest extends IRequest {
  address: string;
  signature: string;
  message: string;
}

export interface AddMAppPermissionRoute extends IRoute<AddMAppPermissionRequest, SubnameResponse> {}