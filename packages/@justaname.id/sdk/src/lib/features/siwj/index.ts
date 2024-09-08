import { generateNonce, SiweMessage, SiweResponse, VerifyOpts, VerifyParams, } from 'siwe';
import { JsonRpcProvider } from 'ethers';
import {

  InvalidStatementException,
  InvalidSubnameException,
  InvalidTimeException
} from '../../errors';
import { checkDomainValid, checkTTL, constructSignInStatement } from '../../utils';
import { OffchainResolvers } from '../../features/offchain-resolvers';

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
  readonly provider: JsonRpcProvider;
  readonly offchainResolver: OffchainResolvers;

  constructor(signInConfig: SiwjConfig){
    const { params, providerUrl } = signInConfig;
    if(typeof params === "string"){
      super(params)
      this.provider = new JsonRpcProvider(providerUrl);
      this.offchainResolver = new OffchainResolvers();
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
    this.offchainResolver = new OffchainResolvers();
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


    await Promise.all([this.verifySubnameAddress(
      subname,
      this.address
    ),this.verifySubnameResolves(subname)])

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

  private async verifySubnameResolves(subname:string){
    const [resolverAddress,resolvers] = await Promise.all([this.provider.getResolver(subname),this.offchainResolver.getAllOffchainResolvers()]);

    const currentOffchainResolver = resolvers.find(resolver => resolver.chainId === this.chainId)

    if(!currentOffchainResolver){
      throw InvalidSubnameException.chainNotSupported(
        this.chainId.toString()
      )
    }

    if(!resolverAddress?.address){
      throw InvalidSubnameException.notRegisteredSubname(
        subname
      )
     }

    if(currentOffchainResolver.resolverAddress !== resolverAddress?.address){
      throw InvalidSubnameException.notOnJustanameResolver(
        subname
      )
    }
    return true
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