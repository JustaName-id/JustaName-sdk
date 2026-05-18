import { IRequest, IRoute, SubnameResponse } from '../common';
import { SIWEHeaders } from '../headers';

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface AppendMAppFieldsRequest {
  key: string;
  value: string;
}

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface AppendMAppFieldRequest extends IRequest{
  subname: string;
  fields: AppendMAppFieldsRequest[];
}

/**
 * @deprecated mApps is deprecated and will be removed in the next major version.
 */
export interface AppendMAppFieldRoute extends IRoute<AppendMAppFieldRequest, SubnameResponse, SIWEHeaders> {}
