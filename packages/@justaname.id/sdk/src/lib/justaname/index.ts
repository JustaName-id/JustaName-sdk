import { JustaNameConfig } from '../types';
import { OffchainResolvers, SignIn, SubnameChallenge, Subnames, EBDC } from '../features';
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

  /**
   * The EBDC feature.
   * @public
   * @type {EBDC}
   * @memberof JustaName
   */
  ebdc: EBDC;

  constructor(
    siwe: SubnameChallenge,
    subnames: Subnames,
    offchainResolvers: OffchainResolvers,
    signIn: SignIn,
    ebdc: EBDC
  ) {
    this.siwe = siwe;
    this.subnames = subnames;
    this.offchainResolvers = offchainResolvers;
    this.signIn = signIn;
    this.ebdc = ebdc;
  }

  /**
   * Initializes the JustaName SDK.
   * @param {JustaNameConfig} configuration - The configuration object.
   * @returns {JustaName} - A promise that resolves with the JustaName SDK.
   * @public
   * @static
   */
  static init(configuration: JustaNameConfig): JustaName {
    this.checkConfig(configuration);
    return new JustaName(
      new SubnameChallenge({
        ...configuration.config,
        ttl: configuration.config.subnameChallenge?.ttl || 120000
      }),
      new Subnames(configuration.providerUrl, configuration.ensDomain, configuration.config.chainId, configuration.apiKey),
      new OffchainResolvers(),
      new SignIn({
        ...configuration.config,
        ttl: configuration.config.signIn?.ttl || 120000
      } , configuration.providerUrl),
      new EBDC(
        configuration.ensDomain,
        configuration.config
      )
    );
  }

  /**
   * Checks if the API key is present.
   * @throws {Error} - If the API key is not present.
   * @private
   * @static
   */
  private static checkConfig(configuration: JustaNameConfig): void {
    const { providerUrl, config, ensDomain } = configuration;

    if (!ensDomain) {
      throw InvalidConfigurationException.ensDomainRequired();
    }

    if (!providerUrl) {
      throw InvalidConfigurationException.providerUrlRequired();
    }

    if (!config) {
      throw InvalidConfigurationException.configRequired();
    }

    if (!config.chainId) {
      throw InvalidConfigurationException.chainIdRequired();
    }

    if (!config.domain) {
      throw InvalidConfigurationException.domainRequired();
    }

    if (!config.origin) {
      throw InvalidConfigurationException.originRequired();
    }

  }
}
