import { CredentialSubjectValue, EthereumEip712Signature2021 } from "../ethereumEip712Signature";

export interface TwitterCredential extends CredentialSubjectValue{
  username: string;
}

export type TwitterEthereumEip712Signature = EthereumEip712Signature2021<TwitterCredential>