import { CredentialSubjectValue, EthereumEip712Signature2021 } from "../ethereumEip712Signature";
export interface OpenPassportCredential extends CredentialSubjectValue{
  proof: string;
}
export type OpenPassportEthereumEip712Signature = EthereumEip712Signature2021<OpenPassportCredential>