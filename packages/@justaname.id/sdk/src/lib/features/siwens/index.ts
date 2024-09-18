import { generateNonce, SiweMessage, SiweResponse, VerifyOpts, VerifyParams, } from 'siwe';
import { JsonRpcProvider } from 'ethers';
import {
  InvalidStatementException,
  InvalidENSException,
  InvalidTimeException,
  InvalidConfigurationException
} from '../../errors';
import { checkDomainValid, checkTTL, constructSignInStatement, extractDataFromStatement } from '../../utils';

export interface SiwensResponse extends SiweResponse {
  ens: string
}

export interface SiwensConfig {
  params: string | SiwensParams
  providerUrl?: string
}

export interface SiwensParams extends Omit<Partial<SiweMessage>,"statement" | "expirationTime" | "issuedAt"> {
  ens: string,
  ttl?: number,
}

export class SIWENS extends SiweMessage {
  readonly provider: JsonRpcProvider;

  constructor(signInConfig: SiwensConfig){
    const { params, providerUrl } = signInConfig;
    if(typeof params === "string"){
      super(params)
      this.provider = new JsonRpcProvider(providerUrl);
      return;
    }

    if(!params.ttl){
      throw InvalidTimeException.requiredTTL()
    }

    if(!params.domain){
      throw InvalidConfigurationException.domainRequired()
    }

    checkTTL(params.ttl);
    checkDomainValid(params.ens);

    const statement = constructSignInStatement(params.domain, params.ens);

    super({
      ...params,
      statement,
      version: params.version || "1",
      ...SIWENS.generateIssuedAndExpirationTime(params.ttl),
    })
    this.provider = new JsonRpcProvider(providerUrl)
  }

  override async verify(params: VerifyParams, opts?: VerifyOpts): Promise<SiwensResponse> {
    let verification: SiweResponse;

    try {
       verification = await super.verify(params, opts);
    } catch (e) {
      const statement = e.data.statement;
      const { ens } = extractDataFromStatement(statement);
      throw {
        ...e,
        ens
      }
    }

    const statement = verification.data.statement
    if(!statement){
      throw InvalidStatementException.invalidStatement()
    }
    const { ens } = extractDataFromStatement(statement)


    await this.verifyEnsAddress(
      ens,
      this.address
    )

    return {
      ...verification,
      ens
    };
  }

  static generateIssuedAndExpirationTime(ttl: number){
    const date = new Date();
    const issuedAt = date.toISOString();
    const expirationTime = new Date(date.getTime() + ttl).toISOString();
    return {
      issuedAt,
      expirationTime
    }
  }

  static generateNonce(){
    return generateNonce()
  }

  private async verifyEnsAddress(ens:string, address:string){
    const resolvedAddress = await this.provider.resolveName(ens);
    if(!resolvedAddress){
      throw InvalidENSException.notRegisteredENS(
        ens
      )
    }

    if(resolvedAddress !== address){
      throw InvalidENSException.invalidENSOwner(
        ens,
        address
      )
    }
    return true;
  }
}

export default SIWENS;