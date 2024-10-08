import { IRequest, IRoute, SubnameResponse } from '../common';
import { SIWEHeaders } from '../headers';

export interface AppendMAppFieldsRequest {
  key: string;
  value: string;
}

export interface AppendMAppFieldRequest extends IRequest{
  subname: string;
  fields: AppendMAppFieldsRequest[];
}

export interface AppendMAppFieldRoute extends IRoute<AppendMAppFieldRequest, SubnameResponse, SIWEHeaders> {}