import { ethers } from 'ethers';
import dotenv from 'dotenv';
import SignIn from '../../../lib/features/sign-in';
dotenv.config();

const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
const PROVIDER_URL = process.env['PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ADDRESS = signer.address;
const CHAIN_ID = 1;
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day
const VALID_SUBNAME = process.env['VALID_SUBNAME'] as string;

describe('SignIn', () => {

  let signIn: SignIn;

  beforeEach(() => {
    signIn = new SignIn({
      origin: URI,
      domain: DOMAIN,
      chainId: CHAIN_ID,
      ttl: VALID_TTL,
    }, PROVIDER_URL);
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
      subname: VALID_SUBNAME,
    });
    expect(response).toBeTruthy();
  });


  it('should verify a signature', async () => {
    const message = signIn.requestSignIn({
      address: ADDRESS,
      subname: VALID_SUBNAME,
    });
    const signature = await signer.signMessage(message);
    const response = await signIn.signIn(message, signature);
    expect(response.success).toBeTruthy();
  },60000)

  it('should fail to verify an invalid signature', async () => {
    const message = signIn.requestSignIn({
      address: ADDRESS,
      subname: VALID_SUBNAME,
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
})