import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import SignIn from '../../../lib/features/sign-in';
import { OffchainResolvers } from '../../../lib/features';
import { configureEnv } from '../../helpers/configureEnv';
import { initializeJustaName } from '../../helpers/initializeJustaName';
import { JustaName } from '../../../lib/justaname';

dotenv.config();

const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const CHAIN_ID = 11155111;
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day

const invalidSigner = new ethers.Wallet(
  ethers.Wallet.createRandom().privateKey
);
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const subnameSigner = ethers.Wallet.createRandom();
const subnameToBeAdded = Math.random().toString(36).substring(7);
const validApiKey = process.env['SDK_JUSTANAME_TEST_API_KEY'] as string;
const JUSTANAME_ENV = process.env['SDK_JUSTANAME_DEV'] === 'true';
const SEPOLIA_PROVIDER_URL = process.env['SDK_SEPOLIA_PROVIDER_URL'] as string;
const MAINNET_PROVIDER_URL = process.env['SDK_MAINNET_PROVIDER_URL'] as string;

describe('SignIn', () => {
  let signIn: SignIn;
  let justaname: JustaName;

  beforeEach(async () => {
    await configureEnv();
    justaname = initializeJustaName(validApiKey);
    signIn = new SignIn({
      siweConfig: {
        domain: DOMAIN,
        origin: URI,
      },
      signInTtl: VALID_TTL,
      chainId: CHAIN_ID,
      offchainResolvers: new OffchainResolvers({
        dev: JUSTANAME_ENV,
      }),
      networks: JustaName.createNetworks([
        {
          chainId: 11155111,
          providerUrl: SEPOLIA_PROVIDER_URL,
        },
        {
          chainId: 1,
          providerUrl: MAINNET_PROVIDER_URL,
        },
      ]),
    });
  });

  it('should add a subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.subnames.addSubname(
      {
        username: subnameToBeAdded,
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(response).toBeDefined();
  });

  it('should create an instance', () => {
    expect(signIn).toBeTruthy();
  });

  it('should generate a nonce', () => {
    expect(signIn.generateNonce()).toBeTruthy();
  });

  it('should generate a different nonce each time', () => {
    const nonce1 = signIn.generateNonce();
    const nonce2 = signIn.generateNonce();
    expect(nonce1).not.toEqual(nonce2);
  });

  it('should request a challenge', async () => {
    const response = signIn.requestSignIn({
      address: subnameSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
    });
    expect(response).toBeTruthy();
  });

  it('should verify a signature', async () => {
    const message = signIn.requestSignIn({
      address: subnameSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
    });
    const signature = await subnameSigner.signMessage(message);
    const response = await signIn.signIn({ message, signature });
    expect(response.success).toBeTruthy();
  }, 60000);

  it('should fail to verify an invalid signature', async () => {
    const message = signIn.requestSignIn({
      address: invalidSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
    });
    const signer2 = new ethers.Wallet(ethers.Wallet.createRandom().privateKey);
    const signature = await signer2.signMessage(message);
    try {
      await signIn.signIn({ message, signature });
    } catch (e) {
      expect(e.success).toBeFalsy();
      return;
    }

    throw new Error('Should have thrown an error');
  });

  it('should return true if JustaName resolver is Configured', async () => {
    const message = signIn.requestSignIn({
      address: subnameSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
    });
    const signature = await subnameSigner.signMessage(message);
    const response = await signIn.signIn({ message, signature });
    expect(response.isJustaName).toBeTruthy();
  }, 60000);

  it('should revoke subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.revokeSubname(
      {
        chainId: CHAIN_ID,
        username: subnameToBeAdded,
      },
      {
        xAddress: subnameSigner.address,
        xSignature: signature,
        xMessage: challenge.challenge,
      }
    );

    expect(response).toBeDefined();
  });
});
