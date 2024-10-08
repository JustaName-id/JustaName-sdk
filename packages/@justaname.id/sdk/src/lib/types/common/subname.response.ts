import { IResponse } from './index';

export interface ContentHash {
  protocolType: string;

  decoded: string;
}

export interface Coin {
  id: number;

  name: string;

  value: string;
}

export interface Text {
  key: string;

  value: string;
}

export interface RecordResponse {
  resolverAddress: string;

  texts: Text[];

  coins: Coin[];

  contentHash: ContentHash | null;
}

export interface SubnameResponse extends IResponse {

  ens: string;

  isClaimed?: boolean;
  
  claimedAt?: Date | null;

  isJAN: boolean;
  
  records: RecordResponse;
}
