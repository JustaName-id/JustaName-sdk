import { JustaNameConfig } from '../types';
import { SubnameChallenge, Subnames, OffchainResolvers, SignIn } from '../features';
import { InvalidConfigurationException } from '../errors/InvalidConfiguration.exception';

/**
 * The main class for the JustaName SDK.
 * @public
 * @class
 * @classdesc The main class for the JustaName SDK.
 * @example
 * ```typescript
 * import { JustaName } from '@justaname.id/sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = JustaName.init(configuration);
 *
 *  const requestChallengeResponse = await justaName.siwe.requestChallenge({
 *  chainId: 1,
 *  origin: 'http://localhost:3333',
 *  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 *  domain: 'localhost',
 *  ttl?: 120000,
 *  });
 *
 *  ```
 */
export class JustaName {
  siwe: SubnameChallenge;

  /**
   * The subnames feature.
   * @public
   * @type {Subnames}
   * @memberof JustaName
   **/
  subnames: Subnames;

  /**
   * The offchainResolvers feature.
   * @public
   * @type {OffchainResolvers}
   * @memberof JustaName
   **/
  offchainResolvers: OffchainResolvers;

  /**
   * The signIn feature.
   * @public
   * @type {SignIn}
   * @memberof JustaName
   **/
  signIn: SignIn;

  constructor(
    siwe: SubnameChallenge,
    subnames: Subnames,
    offchainResolvers: OffchainResolvers,
    signIn: SignIn,
  ) {
    this.siwe = siwe;
    this.subnames = subnames;
    this.offchainResolvers = offchainResolvers;
    this.signIn = signIn;
  }

  /**
   * Initializes the JustaName SDK.
   * @param {JustaNameConfig} configuration - The configuration object.
   * @returns {JustaName} - A promise that resolves with the JustaName SDK.
   * @public
   * @static
   */
  static init(configuration: JustaNameConfig): JustaName {
    this.checkConfig(configuration);;
    return new JustaName(
      new SubnameChallenge(configuration.config.siwe),
      new Subnames(configuration.providerUrl,configuration.apiKey),
      new OffchainResolvers(),
      new SignIn(configuration.config.siwe, configuration.providerUrl)
    );
  }

  /**
   * Checks if the API key is present.
   * @throws {Error} - If the API key is not present.
   * @private
   * @static
   */
  private static checkConfig(configuration: JustaNameConfig): void {
    const { providerUrl, config} = configuration;

    if(!providerUrl){
      throw InvalidConfigurationException.providerUrlRequired();
    }

    if(!config) {
      throw InvalidConfigurationException.configRequired();
    }

    if(!config.siwe){
      throw InvalidConfigurationException.siweConfigRequired();
    }

    if(!config.siwe.chainId){
      throw InvalidConfigurationException.chainIdRequired();
    }

    if(!config.siwe.domain){
      throw InvalidConfigurationException.domainRequired();
    }

    if(!config.siwe.origin){
      throw InvalidConfigurationException.originRequired();
    }

    if(!config.siwe.ttl){
      throw InvalidConfigurationException.ttlRequired();
    }
  }
}
