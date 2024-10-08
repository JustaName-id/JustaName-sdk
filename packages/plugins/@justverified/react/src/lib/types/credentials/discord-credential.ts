import { CredentialSubjectValue, EthereumEip712Signature2021} from "../ethereumEip712Signature";

export interface DiscordCredential extends CredentialSubjectValue{
  username: string;
}

export type DiscordEthereumEip712Signature = EthereumEip712Signature2021<DiscordCredential>