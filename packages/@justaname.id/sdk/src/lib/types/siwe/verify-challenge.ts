import { EmptyHeaders, IRequest, IResponse, IRoute } from '../common';

export interface VerifyChallengeRequest extends IRequest {
  address: string;
  signature?: string;
  message: string;
}

export interface VerifyChallengeResponse extends IResponse {
  verified: boolean;
}

export interface VerifyMessageRoute
  extends IRoute<
    VerifyChallengeRequest,
    VerifyChallengeResponse,
    EmptyHeaders
  > {}
