import { CredentialSubjectValue, EthereumEip712Signature2021 } from '../ethereumEip712Signature';

export interface GithubCredential extends CredentialSubjectValue{
  username: string;
}

export type GithubEthereumEip712Signature = EthereumEip712Signature2021<GithubCredential>