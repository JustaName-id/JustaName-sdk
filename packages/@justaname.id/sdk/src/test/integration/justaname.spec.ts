import { JustaName } from '../../lib/justaname';
import { configureEnv } from '../helpers/configureEnv';
import { initializeJustaName } from '../helpers/initializeJustaName';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

// const invalidApiKey = 'invalid-api-key';
const validApiKey = process.env['SDK_JUSTANAME_TEST_API_KEY'] as string;
jest.setTimeout(50000);
const mAppPk = process.env['SDK_MAPP_PRIVATE_KEY'] as string;
const mAppSigner = new ethers.Wallet(mAppPk);
const subnameSigner = ethers.Wallet.createRandom()
const subnameToBeAdded = Math.random().toString(36).substring(7);
const CHAIN_ID = 11155111;
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const MAPP = process.env['SDK_MAPP'] as string;
const MAPP_2 = MAPP.split('.')[0] + '2' + '.' + MAPP.split('.')[1];
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
      chainId: CHAIN_ID,
      origin: 'http://localhost:3333',
      address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
      domain: 'justaname.id',
    });
    expect(challenge).toBeDefined();
  })

  it('should sign in be 1 day', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: subnameSigner.address,
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
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.subnames.addSubname({
      username: subnameToBeAdded,
      chainId: CHAIN_ID,
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    expect(response).toBeDefined();
  })

  it('should update a subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname({
      contentHash: '',
      username: subnameToBeAdded,
      chainId: CHAIN_ID,
      ensDomain: ENS_DOMAIN,
      addresses: {},
      text: {
        test: 'test',
        test2: 'test2',
      }
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    expect(response).toBeDefined();
  })

  it('mApps shouldn\'t be updated', async () => {

    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname({
      contentHash: '',
      username: subnameToBeAdded,
      chainId: CHAIN_ID,
      ensDomain: ENS_DOMAIN,
      addresses: {},
      text: {
        'mApps': 'shouldntBeUpdated',
        [`test_${MAPP}`]: 'shouldBeOverrideWhenMAppPermissionIsAdded',
      }
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    const mApps = response.data.textRecords.find((text) => text.key === 'mApps')?.value;
    expect(mApps).toBeUndefined();
  })

  it('should remove test if value is empty', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname({
      contentHash: '',
      username: subnameToBeAdded,
      chainId: CHAIN_ID,
      ensDomain: ENS_DOMAIN,
      addresses: {},
      text: {
        test: '',
      }
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    expect(response.data.textRecords.find((text) => text.key === 'test')).toBeUndefined();
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

  it('shouldn\'t have mApps enabled', async () => {
    const subname = await justaname.mApps.checkIfMAppIsEnabled({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID
    })

    expect(subname).toBeFalsy();
  })

  it('should add mApps permission', async () => {
    const challenge = await justaname.mApps.requestAddMAppPermissionChallenge({
      address: subnameSigner.address,
      subname: subnameToBeAdded + '.' +  ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.mApps.addMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    })

    expect(response).toBeDefined();
  })

  it('should add mApps2 permission', async () => {
    const challenge = await justaname.mApps.requestAddMAppPermissionChallenge({
      address: subnameSigner.address,
      subname: subnameToBeAdded + '.' +  ENS_DOMAIN,
      mApp: MAPP_2,
      chainId: CHAIN_ID
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.mApps.addMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    })

    expect(response).toBeDefined();
  })

  it('should have removed test_mApps', async () => {
    const subname = await justaname.subnames.getRecordsByFullName({
      fullName: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID
    })

    const testMApps = subname.texts.find((text) => text.key === `test_${MAPP}`)?.value;

    expect(testMApps).toBeUndefined();
  })

  it('should have mApps enabled', async () => {
    const mapp = await justaname.mApps.checkIfMAppIsEnabled({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID
    })

    expect(mapp).toBeTruthy();
  })

  it('should append field to mApps subname', async () => {
    const challenge = await justaname.mApps.requestAppendMAppFieldChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: mAppSigner.address,
      mApp: ENS_DOMAIN,
      chainId: CHAIN_ID

    })

    const signature = await mAppSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.appendMAppField({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      fields: [{
        key:'test',
        value: 'testValue'
      }, {
        key: 'test2',
        value: 'testValue2'
      }],
      }, {
      xAddress: mAppSigner.address,
      xMessage: challenge.challenge,
      xSignature: signature
    })

    expect(response).toBeDefined();
  })

  it("user shoudn't be able to update mApps field", async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname({
      contentHash: '',
      username: subnameToBeAdded,
      chainId: CHAIN_ID,
      ensDomain: ENS_DOMAIN,
      addresses: {},
      text: {
        [`test2_${MAPP}`]: 'shouldntBeUpdated',
      }
    }, {
      xMessage: challenge.challenge,
      xAddress: subnameSigner.address,
      xSignature: signature
    })

    expect(response.data.textRecords.find((text) => text.key === `test2_${MAPP}`)?.value).toEqual('testValue2');
  })

  it('should remove field if value is empty', async () => {
    const challenge = await justaname.mApps.requestAppendMAppFieldChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: mAppSigner.address,
      mApp: ENS_DOMAIN,
      chainId: CHAIN_ID

    })

    const signature = await mAppSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.appendMAppField({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      fields: [{
        key:'test',
        value: ''}],
    }, {
      xAddress: mAppSigner.address,
      xMessage: challenge.challenge,
      xSignature: signature
    })

    expect(response.data.textRecords.find((text) => text.key === `test_${MAPP}`)).toBeUndefined();
  })


  it('should revoke mApps permission', async () => {
    const challenge = await justaname.mApps.requestRevokeMAppPermissionChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: subnameSigner.address,
      mApp: MAPP,
      chainId: CHAIN_ID
    })

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.revokeMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge
    })

    const mApps = response.data.textRecords.find((text) => text.key === 'mApps')?.value
    const testJawEth = response.data.textRecords.find((text) => text.key === `test_${MAPP}`)?.value

    expect(mApps).toEqual(`{"mApps":["${MAPP_2}"]}`)
    expect(testJawEth).toEqual(undefined)
  })

  it('should revoke subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.revokeSubname({
      chainId: CHAIN_ID,
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
