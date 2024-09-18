import { JustaName } from '../../lib/justaname';
import { configureEnv } from '../helpers/configureEnv';
import { initializeJustaName } from '../helpers/initializeJustaName';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

// const invalidApiKey = 'invalid-api-key';
const validApiKey = process.env['JUSTANAME_TEST_API_KEY'] as string;
jest.setTimeout(50000);
const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
const subnameSigner = ethers.Wallet.createRandom()
const subnameToBeAdded = Math.random().toString(36).substring(7);
const ENS_DOMAIN = process.env['ENS_DOMAIN'] as string;

describe('justaname', () => {

  let justaname: JustaName;

  beforeAll(async () => {
    await configureEnv();
    justaname = initializeJustaName(validApiKey);
  })

  it('should initialize JustaName', () => {
    expect(justaname).toBeInstanceOf(JustaName)
    expect(justaname).toBeDefined();
  })

  it('should request a challenge', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      // 30mins
      ttl:1800000,
      chainId: 1,
      origin: 'http://localhost:3333',
      address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
      domain: 'justaname.id',
    });
    expect(challenge).toBeDefined();
  })

  it('should sign in be 1 day', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: signer.address,
      ens: 'siwj.jaw.eth',
      ttl: 1000 * 60 * 60 * 24
    });
    const issuedAt = challenge.split('Issued At: ')[1].split('\n')[0];
    const expirationTime = challenge.split('Expiration Time: ')[1].split('\n')[0];

    const issuedAtDate = new Date(issuedAt);
    const expirationTimeDate = new Date(expirationTime);

    const difference = expirationTimeDate.getTime() - issuedAtDate.getTime();

    expect(difference).toBe(1000 * 60 * 60 * 24);
  })

  it('should add a subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.subnames.addSubname({
      username: subnameToBeAdded
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    expect(response).toBeDefined();
  })


  it('should verify a challenge', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: subnameSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      ttl: 1800000
    })

    const signature = await subnameSigner.signMessage(challenge);
    const response = await justaname.signIn.signIn(challenge, signature);

    expect(response).toBeDefined();

  })

  it('should add ebdc permission', async () => {
    const challenge = await justaname.ebdc.requestAddEbdcPermissionChallenge({
      address: subnameSigner.address,
      subname: subnameToBeAdded + '.' +  ENS_DOMAIN
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.ebdc.addEbdcPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    })

    expect(response).toBeDefined();
  })

  it('should append field to ebdc subname', async () => {
    const challenge = await justaname.ebdc.requestAppendEbdcFieldChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: signer.address,
    })

    const signature = await signer.signMessage(challenge.challenge);

    const response = await justaname.ebdc.appendEbdcField({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      fields: [{
        key:'test',
        value: 'testValue'
      }]
    }, {
      xAddress: signer.address,
      xMessage: challenge.challenge,
      xSignature: signature
    })

    expect(response).toBeDefined();
  })

  it('should revoke ebdc permission', async () => {
    const subname = await justaname.subnames.getRecordsByFullName({
      fullName: subnameToBeAdded + '.' + ENS_DOMAIN,
    })

    const ebdc = subname.texts.find((text) => text.key === 'ebdc')?.value
    const testJawEth = subname.texts.find((text) => text.key === 'test_jaw.eth')?.value

    expect(ebdc).toEqual('{"ebdcs":["jaw.eth"]}')
    expect(testJawEth).toEqual('testValue')
  })

  it('should revoke subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.revokeSubname({
      chainId: 11155111,
      ensDomain: ENS_DOMAIN,
      username: subnameToBeAdded
    }, {
      xAddress: subnameSigner.address,
      xSignature: signature,
      xMessage: challenge.challenge
    })

    expect(response).toBeDefined();
  })
})
