import { CredentialMetadataKey } from '../credentials';

export type VerifyResponse = {
  credentials: Partial<Record<CredentialMetadataKey, boolean>>;
  ens: string;
}[];
