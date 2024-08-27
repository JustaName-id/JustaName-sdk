import { generateNonce, SiweMessage, SiweResponse, VerifyOpts, VerifyParams } from 'siwe';
import { JsonRpcProvider, Provider } from 'ethers';
import {

  InvalidStatementException,
  InvalidSubnameException,
  InvalidTimeException
} from '../../errors';
import { checkDomainValid, checkTTL, constructSignInStatement } from '../../utils';

export interface SiwjResponse extends SiweResponse {
  subname: string
}

export interface SiwjConfig {
  params: string | SiwjParams
  providerUrl?: string
}

export interface SiwjParams extends Omit<Partial<SiweMessage>,"statement" | "expirationTime" | "issuedAt"> {
  subname: string,
  ttl?: number,
}

export class Siwj extends SiweMessage {
  readonly provider: Provider;

  constructor(signInConfig: SiwjConfig){
    const { params, providerUrl } = signInConfig;
    if(typeof params === "string"){
      super(params)
      this.provider = new JsonRpcProvider(providerUrl);
      return;
    }

    if(!params.ttl){
      throw InvalidTimeException.requiredTTL()
    }

    checkTTL(params.ttl);
    checkDomainValid(params.subname);

    const statement = constructSignInStatement(params.subname);

    super({
      ...params,
      statement,
      version: params.version || "1",
      expirationTime: Siwj.generateExpirationFromTtl(params.ttl),
    })

    this.provider = new JsonRpcProvider(providerUrl)
  }

  override async verify(params: VerifyParams, opts?: VerifyOpts): Promise<SiwjResponse> {
    let verification: SiweResponse;


    try {
       verification = await super.verify(params, opts);
    } catch (e) {
      const statement = e.data.statement;
      const subname = Siwj.extractSubnameFromStatement(statement);
      throw {
        ...e,
        subname
      }
    }

    const statement = verification.data.statement
    if(!statement){
      throw InvalidStatementException.invalidStatement()
    }
    const subname = Siwj.extractSubnameFromStatement(statement)

    await this.verifySubnameAddress(
      subname,
      this.address
    )

    return {
      ...verification,
      subname
    };
  }

  static generateExpirationFromTtl(ttl:number){
    return new Date(Date.now() + ttl).toISOString();
  }

  static generateNonce(){
    return generateNonce()
  }

  static extractSubnameFromStatement(statement:string){
    const regex = /I want to sign in as (.*)/;
    const result = regex.exec(statement);
    if(result){
      return result[1];
    }
    throw InvalidStatementException.invalidStatement();
  }

  private async verifySubnameAddress(subname:string, address:string){
    const resolvedAddress = await this.provider.resolveName(subname);
    if(!resolvedAddress){
      throw InvalidSubnameException.notRegisteredSubname(
        subname
      )
    }

    if(resolvedAddress !== address){
      throw InvalidSubnameException.invalidSubnameOwner(
        subname,
        address
      )
    }
    return true;
  }
}

export default Siwj;