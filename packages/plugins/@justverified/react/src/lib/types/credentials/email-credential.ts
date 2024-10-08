import { CredentialSubjectValue, EthereumEip712Signature2021} from "../ethereumEip712Signature";

export interface EmailCredential extends CredentialSubjectValue{
  email: string;
}

export type EmailEthereumEip712Signature = EthereumEip712Signature2021<EmailCredential>