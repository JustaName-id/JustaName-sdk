import { JustaName } from '../../lib/justaname';
import { configureEnv } from '../helpers/configureEnv';
import { initializeJustaName } from '../helpers/initializeJustaName';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { ChainId } from '../../lib/types';
import { InvalidConfigurationException } from '../../lib/errors';

dotenv.config();

const validApiKey = process.env['SDK_JUSTANAME_TEST_API_KEY'] as string;
jest.setTimeout(50000);
const mAppPk = process.env['SDK_MAPP_PRIVATE_KEY'] as string;
const mAppSigner = new ethers.Wallet(mAppPk);
const subnameSigner = ethers.Wallet.createRandom();
const subnameToBeAdded = Math.random().toString(36).substring(7);
const CHAIN_ID = parseInt(process.env['SDK_CHAIN_ID'] as string) as ChainId;
const ENS_DOMAIN = process.env['SDK_ENS_DOMAIN'] as string;
const MAPP = process.env['SDK_MAPP'] as string;
const MAPP_2 = MAPP.split('.')[0] + '2' + '.' + MAPP.split('.')[1];
const SEPOLIA_PROVIDER_URL = process.env['SDK_SEPOLIA_PROVIDER_URL'] as string;
const MAINNET_PROVIDER_URL = process.env['SDK_MAINNET_PROVIDER_URL'] as string;
describe('justaname', () => {
  let justaname: JustaName;

  beforeAll(async () => {
    await configureEnv();
    justaname = initializeJustaName(validApiKey);
  });

  it('should initialize JustaName', () => {
    expect(justaname).toBeInstanceOf(JustaName);
    expect(justaname).toBeDefined();
  });

  it('should request a challenge', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      // 30mins
      ttl: 1800000,
      chainId: CHAIN_ID,
      origin: 'http://localhost:3333',
      address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
      domain: 'justaname.id',
    });
    expect(challenge).toBeDefined();
  });

  it('should throw an error if domain and origin are not provided in config or function call', async () => {
    const justaname = JustaName.init({
      networks: [
        {
          chainId: 1,
          providerUrl: MAINNET_PROVIDER_URL,
        },
        {
          chainId: 11155111,
          providerUrl: SEPOLIA_PROVIDER_URL,
        },
      ],
    });
    expect(() => {
      return justaname.siwe.requestChallenge({
        address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
      });
    }).toThrow(
      InvalidConfigurationException.missingParameters(['origin', 'domain'])
    );
  });

  it('should sign in be 1 day', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: subnameSigner.address,
      ens: 'siwj.jaw.eth',
      ttl: 1000 * 60 * 60 * 24,
    });
    const issuedAt = challenge.split('Issued At: ')[1].split('\n')[0];
    const expirationTime = challenge
      .split('Expiration Time: ')[1]
      .split('\n')[0];

    const issuedAtDate = new Date(issuedAt);
    const expirationTimeDate = new Date(expirationTime);

    const difference = expirationTimeDate.getTime() - issuedAtDate.getTime();

    expect(difference).toBe(1000 * 60 * 60 * 24);
  });

  it('should add a subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.subnames.addSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(response).toBeDefined();
  });

  it('should check if subname2 is available', async () => {
    const response = await justaname.subnames.isSubnameAvailable({
      subname: subnameToBeAdded + '2' + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(response.isAvailable).toBeTruthy();
  });

  it('should add a subname2 with text and addresses and contentHash', async () => {
    const subnameToBeAdded2 = subnameToBeAdded + '2';
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.subnames.addSubname(
      {
        username: subnameToBeAdded2,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          test: 'test',
        },
        addresses: {
          0: '1PxsjLASknj7GfF54zXejgygcQCKJ1ubah',
        },
        contentHash:
          'ipfs://bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(response).toBeDefined();

    const records = await justaname.subnames.getRecords({
      ens: subnameToBeAdded2 + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(
      records.records.texts.find((text) => text.key === 'test')?.value
    ).toEqual('test');
    expect(records.records.contentHash).toEqual({
      protocolType: 'ipfs',
      decoded: 'bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
    });
    expect(records.records.coins.find((coin) => coin.id === 0)?.value).toEqual(
      '1PxsjLASknj7GfF54zXejgygcQCKJ1ubah'
    );

    const response2 = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded2,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          test2: 'test2',
          test: '',
        },
        addresses: [
          {
            coinType: '0',
            address: '1CznrXZXdCQeZVSQnDuytm8a957jUeDpdw',
          },
        ],
        contentHash:
          'ipns://k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430',
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(response2).toBeDefined();

    const records2 = await justaname.subnames.getRecords({
      ens: subnameToBeAdded2 + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(
      records2.records.texts.find((text) => text.key === 'test2')?.value
    ).toEqual('test2');
    expect(
      records2.records.texts.find((text) => text.key === 'test')?.value
    ).toBeUndefined();
    expect(records2.records.contentHash).toEqual({
      protocolType: 'ipns',
      decoded: 'k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430',
    });
    expect(records2.records.coins.find((coin) => coin.id === 0)?.value).toEqual(
      '1CznrXZXdCQeZVSQnDuytm8a957jUeDpdw'
    );
  });

  it('should get the two subnames for this address', async () => {
    const subnameOne = await justaname.subnames.getSubname({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const subnameTwo = await justaname.subnames.getSubname({
      subname: subnameToBeAdded + '2.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const subnamesForAddress = await justaname.subnames.getSubnamesByAddress({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    expect(
      subnamesForAddress.subnames.sort((e) => {
        return e.ens === subnameToBeAdded + '.' + ENS_DOMAIN ? -1 : 1;
      })
    ).toEqual([subnameOne, subnameTwo].sort());
  });

  it('should update a subname', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          test: 'test',
          test2: 'test2',
        },
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(response).toBeDefined();
  });

  it('should throw an error if contentHash is invalid', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    try {
      await justaname.subnames.updateSubname(
        {
          username: subnameToBeAdded,
          chainId: CHAIN_ID,
          ensDomain: ENS_DOMAIN,
          contentHash: 'invalid-content-hash',
        },
        {
          xMessage: challenge.challenge,
          xAddress: subnameSigner.address,
          xSignature: signature,
        }
      );
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should be able to add contentHash', async () => {
    const records = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(records.records.contentHash).toBeNull();

    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        contentHash:
          'ipfs://bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );
    const records2 = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(response.records.contentHash).toEqual({
      protocolType: 'ipfs',
      decoded: 'bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
    });
    expect(records2.records.contentHash).toEqual({
      protocolType: 'ipfs',
      decoded: 'bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
    });
  });

  it("mApps shouldn't be updated", async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          mApps: 'shouldntBeUpdated',
          [`test_${MAPP}`]: 'shouldBeOverrideWhenMAppPermissionIsAdded',
        },
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    const mApps = response.records.texts.find(
      (text) => text.key === 'mApps'
    )?.value;
    expect(mApps).toBeUndefined();
  });

  it('should remove test if value is empty', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          test: '',
        },
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(
      response.records.texts.find((text) => text.key === 'test')
    ).toBeUndefined();
    expect(response).toBeDefined();
  });

  it('should verify a challenge', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: subnameSigner.address,
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      ttl: 1800000,
    });

    const signature = await subnameSigner.signMessage(challenge);
    const response = await justaname.signIn.signIn({
      message: challenge,
      signature,
    });

    expect(response).toBeDefined();
  });

  it("should return false if ens can't enable mApps", async () => {
    const canEnable = await justaname.mApps.canEnableMApps({
      ens: 'justatest2.eth',
      chainId: CHAIN_ID,
    });

    expect(canEnable).toBeFalsy();
  });

  it('should return true if ens can enable mApps', async () => {
    const canEnable = await justaname.mApps.canEnableMApps({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(canEnable).toBeTruthy();
  });

  it("shouldn't have mApps enabled", async () => {
    const subname = await justaname.mApps.checkIfMAppIsEnabled({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID,
    });

    expect(subname).toBeFalsy();
  });

  it('should add mApps permission', async () => {
    const challenge = await justaname.mApps.requestAddMAppPermissionChallenge({
      address: subnameSigner.address,
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.mApps.addMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    });

    expect(response).toBeDefined();
  });

  it('should add mApps2 permission', async () => {
    const challenge = await justaname.mApps.requestAddMAppPermissionChallenge({
      address: subnameSigner.address,
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP_2,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);
    const response = await justaname.mApps.addMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    });

    expect(response).toBeDefined();
  });

  it('should have removed test_mApps', async () => {
    const subname = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const testMApps = subname.records.texts.find(
      (text) => text.key === `test_${MAPP}`
    )?.value;

    expect(testMApps).toBeUndefined();
  });

  it('should have mApps enabled', async () => {
    const mapp = await justaname.mApps.checkIfMAppIsEnabled({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      mApp: MAPP,
      chainId: CHAIN_ID,
    });

    expect(mapp).toBeTruthy();
  });

  it('should append field to mApps subname', async () => {
    const challenge = await justaname.mApps.requestAppendMAppFieldChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: mAppSigner.address,
      mApp: ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const signature = await mAppSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.appendMAppField(
      {
        subname: subnameToBeAdded + '.' + ENS_DOMAIN,
        fields: [
          {
            key: 'test',
            value: 'testValue',
          },
          {
            key: 'test2',
            value: 'testValue2',
          },
        ],
      },
      {
        xAddress: mAppSigner.address,
        xMessage: challenge.challenge,
        xSignature: signature,
      }
    );

    expect(response).toBeDefined();
  });

  it("user shoudn't be able to update mApps field", async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        text: {
          [`test2_${MAPP}`]: 'shouldntBeUpdated',
        },
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    expect(
      response.records.texts.find((text) => text.key === `test2_${MAPP}`)?.value
    ).toEqual('testValue2');
  });

  it('should be remove contentHash', async () => {
    const records = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(records.records.contentHash).toEqual({
      protocolType: 'ipfs',
      decoded: 'bafybeiear427jnvpwhlnvptsc3n6shccecoclur2poxnsvlsqfgskdrjfi',
    });

    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.updateSubname(
      {
        username: subnameToBeAdded,
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        contentHash: '',
      },
      {
        xMessage: challenge.challenge,
        xAddress: subnameSigner.address,
        xSignature: signature,
      }
    );

    const records2 = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    expect(records2.records.contentHash).toBeNull();

    expect(response.records.contentHash).toBeNull();
  });

  it('should remove field if value is empty', async () => {
    const challenge = await justaname.mApps.requestAppendMAppFieldChallenge({
      subname: subnameToBeAdded + '.' + ENS_DOMAIN,
      address: mAppSigner.address,
      mApp: ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const signature = await mAppSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.appendMAppField(
      {
        subname: subnameToBeAdded + '.' + ENS_DOMAIN,
        fields: [
          {
            key: 'test',
            value: '',
          },
        ],
      },
      {
        xAddress: mAppSigner.address,
        xMessage: challenge.challenge,
        xSignature: signature,
      }
    );

    expect(
      response.records.texts.find((text) => text.key === `test_${MAPP}`)
    ).toBeUndefined();
  });

  it('should revoke mApps permission', async () => {
    const challenge =
      await justaname.mApps.requestRevokeMAppPermissionChallenge({
        subname: subnameToBeAdded + '.' + ENS_DOMAIN,
        address: subnameSigner.address,
        mApp: MAPP,
        chainId: CHAIN_ID,
      });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.mApps.revokeMAppPermission({
      address: subnameSigner.address,
      signature,
      message: challenge.challenge,
    });

    const mApps = response.records.texts.find(
      (text) => text.key === 'mApps'
    )?.value;
    const testJawEth = response.records.texts.find(
      (text) => text.key === `test_${MAPP}`
    )?.value;

    expect(mApps).toEqual(`{"mApps":["${MAPP_2}"]}`);
    expect(testJawEth).toEqual(undefined);
  });

  it('should get all subnames', async () => {
    const subnames = await justaname.subnames.getSubnamesByAddress({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    expect(subnames.subnames.length).toBeGreaterThanOrEqual(2);
  });

  it('should get all subnames by ens domain', async () => {
    const subnames = await justaname.subnames.getSubnamesByEnsDomain({
      ensDomain: ENS_DOMAIN,
    });

    const registeredSubnames = subnames.data.filter(
      (subname) =>
        subname.ens === subnameToBeAdded + '.' + ENS_DOMAIN ||
        subname.ens === subnameToBeAdded + '2.' + ENS_DOMAIN
    );

    expect(registeredSubnames.length).toBe(2);
  });

  it('should revoke subname', async () => {
    const records = await justaname.subnames.getRecords({
      ens: subnameToBeAdded + '.' + ENS_DOMAIN,
      chainId: CHAIN_ID,
    });

    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.revokeSubname(
      {
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        username: subnameToBeAdded,
      },
      {
        xAddress: subnameSigner.address,
        xSignature: signature,
        xMessage: challenge.challenge,
      }
    );
    const { claimedAt, isClaimed, ...rest } = response;
    expect(response).toBeDefined();
    expect(rest).toEqual(records);
  });

  it('should revoke subname2', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      address: subnameSigner.address,
      chainId: CHAIN_ID,
    });

    const signature = await subnameSigner.signMessage(challenge.challenge);

    const response = await justaname.subnames.revokeSubname(
      {
        chainId: CHAIN_ID,
        ensDomain: ENS_DOMAIN,
        username: subnameToBeAdded + '2',
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
