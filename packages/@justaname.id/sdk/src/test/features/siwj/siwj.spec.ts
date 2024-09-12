import { ethers } from 'ethers';
import dotenv from 'dotenv';
import Siwj from '../../../lib/features/siwj';
import { InvalidSubnameException, InvalidTimeException } from '../../../lib/errors';
import { extractDataFromStatement } from '@justaname.id/sdk';

dotenv.config();

const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
const PROVIDER_URL = process.env['PROVIDER_URL'] as string;
const DOMAIN = 'justaname.id';
const URI = 'https://' + DOMAIN;
const ADDRESS = signer.address;
const CHAIN_ID = 11155111;
const VERSION = '1';
const NONCE = '1234567890';
const VALID_TTL = 60 * 60 * 24 * 1000; // 1 day
const TTL_LESS_THAN_ZERO = -1;
const TTL_GREATER_THAN_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER + 1;
const INVALID_SUBNAME = 'justaname';
const VALID_SUBNAME = process.env['VALID_SUBNAME'] as string;
describe('Siwj', () => {

  let siwj: Siwj;
  let message: string;
  beforeEach(() => {

    siwj = new Siwj({
      params: {
        domain: DOMAIN,
        address: ADDRESS,
        uri: URI,
        version: VERSION,
        nonce: NONCE,
        chainId: CHAIN_ID,
        ttl: VALID_TTL,
        subname: VALID_SUBNAME
      },
      providerUrl: PROVIDER_URL
    });

    message = siwj.prepareMessage();
  });

  it('should create an instance', () => {
    expect(siwj).toBeTruthy();
  });

  it('should create the message', () => {
    expect(siwj.prepareMessage()).toBeTruthy();
  });

  
  it('should throw an error when ttl is less than zero', () => {
    expect(() => {
      new Siwj({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: TTL_LESS_THAN_ZERO,
          subname: VALID_SUBNAME
        }
      });
    }).toThrow(InvalidTimeException.timeValueLessThanZero().message);

  });

  it('should throw an error when ttl exceeds max safe integer', () => {
    expect(() => {
      new Siwj({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: TTL_GREATER_THAN_MAX_SAFE_INTEGER,
          subname: VALID_SUBNAME
        }
      });
    }).toThrow(InvalidTimeException.timeExceedsMaxSafeInteger().message);
  });

  it('should throw an error when subname is invalid', () => {
    expect(() => {
      new Siwj({
        params: {
          domain: DOMAIN,
          address: ADDRESS,
          uri: URI,
          version: VERSION,
          nonce: NONCE,
          chainId: CHAIN_ID,
          ttl: VALID_TTL,
          subname: INVALID_SUBNAME
        }
      });
    }).toThrow(InvalidSubnameException.invalidSubnameFormat().message);
  });

  it('should extract subname from statement', () => {
    if (!siwj.statement) {
      throw new Error('Statement is empty');
    }
    expect(extractDataFromStatement(siwj.statement)).toEqual({
      domain: DOMAIN,
      subname: VALID_SUBNAME,
    });
  });

  it('should generate expiration from ttl', () => {
    expect(Siwj.generateExpirationFromTtl(VALID_TTL)).toBeTruthy();
  });

  it('should generate a different nonce each time', () => {
    const nonce1 = Siwj.generateNonce();
    const nonce2 = Siwj.generateNonce();
    expect(nonce1).not.toEqual(nonce2);
  })

  it('should generate a valid signature', async () => {
    const signature = await signer.signMessage(siwj.prepareMessage());
    expect(signature).toBeTruthy();
  });

  it('should verify a valid signature', async () => {
    const signature = await signer.signMessage(message);
    const address = await new Siwj({
      params:message,
      providerUrl: PROVIDER_URL
    }).verify({
      signature
    });
    expect(address.success).toBeTruthy();
  },60000)

  it('should return subname in the response', async () => {
    const signature = await signer.signMessage(message);
    const address = await new Siwj({
      params:message,
      providerUrl: PROVIDER_URL
    }).verify({
      signature
    });
    expect(address.subname).toBe(VALID_SUBNAME);
  },60000)

  it('should return subname in the failed response', async () => {
    const signer2 = ethers.Wallet.createRandom();
    const signature = await signer2.signMessage(message);
    try {
        await new Siwj({
        params: message,
        providerUrl: PROVIDER_URL
      }).verify({
        signature: signature
      });
    } catch (e) {
      expect(e.subname).toBe(VALID_SUBNAME);
      return;
    }
    throw new Error('Should have thrown an error');
  },60000)

  it('should throw an error if address isn\'t owner of subname', async () => {
    const signer = ethers.Wallet.createRandom();
    const siwj = new Siwj({
      params: {
        domain: DOMAIN,
        address: signer.address,
        uri: URI,
        version: VERSION,
        nonce: NONCE,
        chainId: CHAIN_ID,
        ttl: VALID_TTL,
        subname: VALID_SUBNAME
      },
      providerUrl: PROVIDER_URL
    });
    const message = siwj.prepareMessage();
    const signature = await signer.signMessage(message);
    const siwjInstance = new Siwj({
      params: message,
      providerUrl: PROVIDER_URL
    })

    await expect(siwjInstance.verify({
      signature
    })).rejects.toThrow(InvalidSubnameException.invalidSubnameOwner(VALID_SUBNAME, signer.address).message);
  }, 60000);
});