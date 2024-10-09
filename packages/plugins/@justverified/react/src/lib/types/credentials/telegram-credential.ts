import { CredentialSubjectValue, EthereumEip712Signature2021 } from "../ethereumEip712Signature";

export interface TelegramCredential extends CredentialSubjectValue{
  username: string;
}

export type TelegramEthereumEip712Signature = EthereumEip712Signature2021<TelegramCredential>