import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import {
  SIWENS,
  InvalidTimeException,
  InvalidENSException, extractDataFromStatement
} from '../';
dotenv.config();

const pk = process.env['SIWENS_PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
const PROVIDER_URL = process.env['SIWENS_PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ADDRESS = signer.address;
const CHAIN_ID = 11155111;
const VERSION = '1';
const NONCE = '1234567890';
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day
const TTL_LESS_THAN_ZERO = -1;
const TTL_GREATER_THAN_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER + 1;
const INVALID_ENS = 'justaname';
const VALID_ENS = process.env['SIWENS_VALID_ENS'] as string;

describe('SIWENS', () => {

  let siwens: SIWENS;
  let message: string;
  beforeEach(() => {

    siwens = new SIWENS({
      params: {
        domain: DOMAIN,
        address: ADDRESS,
        uri: URI,
        version: VERSION,
        nonce: NONCE,
        chainId: CHAIN_ID,
        ttl: VALID_TTL,
        ens: VALID_ENS
      },
      providerUrl: PROVIDER_URL
    });

    message = siwens.prepareMessage();
  });

  it('should create an instance', () => {
    expect(siwens).toBeTruthy();
  });

  it('should create the message', () => {
    expect(siwens.prepareMessage()).toBeTruthy();
  });


  it('should throw an error when ttl is less than zero', () => {
    expect(() => {
      new SIWENS({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: TTL_LESS_THAN_ZERO,
          ens: VALID_ENS
        }
      });
    }).toThrow(InvalidTimeException.timeValueLessThanZero().message);

  });

  it('should throw an error when ttl exceeds max safe integer', () => {
    expect(() => {
      new SIWENS({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: TTL_GREATER_THAN_MAX_SAFE_INTEGER,
          ens: VALID_ENS
        }
      });
    }).toThrow(InvalidTimeException.timeExceedsMaxSafeInteger().message);
  });

  it('should throw an error when ens is invalid', () => {
    expect(() => {
      new SIWENS({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: VALID_TTL,
          ens: INVALID_ENS
        }
      });
    }).toThrow(InvalidENSException.invalidENSFormat().message);
  });

  it('should extract ens from statement', () => {
    if (!siwens.statement) {
      throw new Error('Statement is empty');
    }
    expect(extractDataFromStatement(siwens.statement)).toEqual({
      domain: DOMAIN,
      ens: VALID_ENS,
    });
  });

  it('should generate issued and expiration time', () => {
    const ttl = 1000 * 60 * 60 * 24;
    const { issuedAt, expirationTime } = SIWENS.generateIssuedAndExpirationTime(ttl);
    expect(new Date(expirationTime).getTime() - new Date(issuedAt).getTime()).toBe(ttl);
  });

  it('should generate a different nonce each time', () => {
    const nonce1 = SIWENS.generateNonce();
    const nonce2 = SIWENS.generateNonce();
    expect(nonce1).not.toEqual(nonce2);
  })

  it('should generate a valid signature', async () => {
    const signature = await signer.signMessage(siwens.prepareMessage());
    expect(signature).toBeTruthy();
  });

  it('should verify a valid signature', async () => {
    const signature = await signer.signMessage(message);
    const address = await new SIWENS({
      params:message,
      providerUrl: PROVIDER_URL
    }).verify({
      signature
    });
    expect(address.success).toBeTruthy();
  },60000)

  it('should return ens in the response', async () => {
    const signature = await signer.signMessage(message);
    const address = await new SIWENS({
      params:message,
      providerUrl: PROVIDER_URL
    }).verify({
      signature
    });
    expect(address.ens).toBe(VALID_ENS);
  },60000)

  it('should return ens in the failed response', async () => {
    const signer2 = ethers.Wallet.createRandom();
    const signature = await signer2.signMessage(message);
    try {
      await new SIWENS({
        params: message,
        providerUrl: PROVIDER_URL
      }).verify({
        signature: signature
      });
    } catch (e) {
      expect(e.ens).toBe(VALID_ENS);
      return;
    }
    throw new Error('Should have thrown an error');
  },60000)

  it('should throw an error if address isn\'t owner of ens', async () => {
    const signer = ethers.Wallet.createRandom();
    const siwens = new SIWENS({
      params: {
        domain: DOMAIN,
        address: signer.address,
        uri: URI,
        version: VERSION,
        nonce: NONCE,
        chainId: CHAIN_ID,
        ttl: VALID_TTL,
        ens: VALID_ENS
      },
      providerUrl: PROVIDER_URL
    });
    const message = siwens.prepareMessage();
    const signature = await signer.signMessage(message);
    const siwensInstance = new SIWENS({
      params: message,
      providerUrl: PROVIDER_URL
    })

    await expect(siwensInstance.verify({
      signature
    })).rejects.toThrow(InvalidENSException.invalidENSOwner(VALID_ENS, signer.address).message);
  }, 60000);
});