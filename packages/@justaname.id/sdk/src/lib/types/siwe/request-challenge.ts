import { ChainId, EmptyHeaders, IRequest, IResponse, IRoute } from '../common';

export interface RequestChallengeRequest extends IRequest {
  domain: string;
  address: string;
  origin: string;
  chainId: ChainId;
  ttl?: number;
}

export interface RequestChallengeResponse extends IResponse{
  challenge: string;
}

export interface RequestChallengeRoute extends IRoute<RequestChallengeRequest, RequestChallengeResponse, EmptyHeaders, 'origin' | 'domain' | 'chainId' | 'ttl'> {}

