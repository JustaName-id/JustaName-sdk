import { ethers } from 'ethers';
import dotenv from 'dotenv';
import SignIn from '../../../lib/features/sign-in';
import { OffchainResolvers } from '../../../lib/features';
dotenv.config();

const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
const PROVIDER_URL = process.env['PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ADDRESS = signer.address;
const CHAIN_ID = 11155111;
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day
const VALID_ENS = process.env['VALID_ENS'] as string;


describe('SignIn', () => {

  let signIn: SignIn;

  beforeEach(() => {
    signIn = new SignIn({
      origin: URI,
      domain: DOMAIN,
      chainId: CHAIN_ID,
      ttl: VALID_TTL,
    }, PROVIDER_URL,
      new OffchainResolvers()
      );
  });

  it('should create an instance', () => {
    expect(signIn).toBeTruthy();
  });

  it('should generate a nonce', () => {
    expect(signIn.generateNonce()).toBeTruthy();
  })

  it('should generate a different nonce each time', () => {
    const nonce1 = signIn.generateNonce();
    const nonce2 = signIn.generateNonce();
    expect(nonce1).not.toEqual(nonce2);
  });

  it('should request a challenge', async () => {
    const response = signIn.requestSignIn({
      address: ADDRESS,
      ens: VALID_ENS,
    });
    expect(response).toBeTruthy();
  });


  it('should verify a signature', async () => {
    const message = signIn.requestSignIn({
      address: ADDRESS,
      ens: VALID_ENS,
    });
    const signature = await signer.signMessage(message);
    const response = await signIn.signIn(message, signature);
    expect(response.success).toBeTruthy();
  },60000)

  it('should fail to verify an invalid signature', async () => {
    const message = signIn.requestSignIn({
      address: ADDRESS,
      ens: VALID_ENS,
    });
    const signer2 = new ethers.Wallet(ethers.Wallet.createRandom().privateKey);
    const signature = await signer2.signMessage(message);
    try {
      await signIn.signIn(message, signature);
    }catch(e){
      expect(e.success).toBeFalsy()
      return;
    }

    throw new Error('Should have thrown an error');
  })

  it('should return true if JustaName resolver is Configured', async () => {
    const message = signIn.requestSignIn({
      address: ADDRESS,
      ens: VALID_ENS,
    });
    const signature = await signer.signMessage(message);
    const response = await signIn.signIn(message, signature);
    expect(response.isJustaName).toBeTruthy();
  },60000)
})