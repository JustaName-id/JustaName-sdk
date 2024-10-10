
export type PrimitiveValue = string | number | boolean | null;


export type CredentialSubjectValue = Record<string, PrimitiveValue>;

export class EthereumEip712Signature2021<T extends CredentialSubjectValue = {}> {
  credentialSubject: CredentialSubject & T;
  issuanceDate: Date;
  expirationDate: Date;
  "@context": string | Record<string, any> | (string | Record<string, any>)[];
  type: string[] | string

  constructor({
                credentialSubject,
                issuanceDate,
                expirationDate,
                context = [],
                type = []
              }: {
    credentialSubject: CredentialSubject & T
    issuanceDate: Date,
    expirationDate: Date,
    context?: string[],
    type?: string[],
  }) {
    this.credentialSubject = credentialSubject;
    this.issuanceDate = issuanceDate;
    this.expirationDate = expirationDate;
    this["@context"] = ["https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/vc/status-list/2021/v1",
      ...context];
    this.type = ["VerifiableCredential", ...type];
  }
}


export class VerifiableEthereumEip712Signature2021<T extends CredentialSubjectValue = {}> extends EthereumEip712Signature2021<T> {
  proof: Proof;
  issuer: Issuer
  constructor({
                proof,
                issuer,
                ...args
              }: {
    issuer: Issuer,
    credentialSubject: CredentialSubject & T
    issuanceDate: Date,
    expirationDate: Date,
    context: string[],
    type: string[],
    proof: Proof
  }) {
    super(args);
    this.proof = proof;
    this.issuer = issuer;
  }
}

export class CredentialSubject {
  id?: string;
}

export class Issuer {
  id: string;

  constructor({id}: { id: string }) {
    this.id = id;
  }
}

export class Proof {
  verificationMethod: string;
  created: Date;
  proofPurpose: string;
  type: string;
  proofValue: string;
  eip712: EthereumEip712Signature;

  constructor({
                verificationMethod,
                proofPurpose,
                proofValue,
                created,
                eip712,
                type
              }: {
    verificationMethod: string,
    created: Date,
    proofPurpose: string,
    type: string,
    proofValue: string,
    eip712: EthereumEip712Signature
  }) {
    this.verificationMethod = verificationMethod;
    this.created = created;
    this.proofPurpose = proofPurpose;
    this.type = type;
    this.proofValue = proofValue;
    this.eip712 = eip712;
  }
}

export class EthereumEip712Signature {
  domain: Domain;
  types: Types;
  primaryType: string;

  constructor({
                domain,
                types,
                primaryType
              }: { domain: Domain, types: Types, primaryType: string }) {
    this.domain = domain;
    this.types = types;
    this.primaryType = primaryType;
  }
}

export class Domain {
  chainId: number;
  name: string;
  version: string;

  constructor({
                chainId,
                name,
                version
              }: { chainId: number, name: string, version: string }) {
    this.chainId = chainId;
    this.name = name;
    this.version = version;
  }
}

export class Types {
  EIP712Domain: CredentialSubjectElement[];
  CredentialSubject: CredentialSubjectElement[];
  Issuer: CredentialSubjectElement[];
  Proof: CredentialSubjectElement[];
  VerifiableCredential: CredentialSubjectElement[];

  constructor({
                EIP712Domain,
                CredentialSubject,
                Issuer,
                Proof,
                VerifiableCredential
              }: {
    EIP712Domain: CredentialSubjectElement[],
    CredentialSubject: CredentialSubjectElement[],
    Issuer: CredentialSubjectElement[],
    Proof: CredentialSubjectElement[],
    VerifiableCredential: CredentialSubjectElement[]
  }) {
    this.EIP712Domain = EIP712Domain;
    this.CredentialSubject = CredentialSubject;
    this.Issuer = Issuer;
    this.Proof = Proof;
    this.VerifiableCredential = VerifiableCredential;
  }
}

export class CredentialSubjectElement {
  name: string;
  type: string;

  constructor({name, type}: { name: string, type: string }) {
    this.name = name;
    this.type = type;
  }
}
