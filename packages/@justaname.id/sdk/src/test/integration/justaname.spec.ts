import { JustaName } from '../../lib/justaname';
import { configureEnv } from '../helpers/configureEnv';
import { initializeJustaName } from '../helpers/initializeJustaName';
import { ethers } from 'ethers';

// const invalidApiKey = 'invalid-api-key';
const validApiKey = process.env['JUSTANAME_TEST_API_KEY'] as string;
jest.setTimeout(50000);
// const random = Math.random().toString(36).substring(7);
const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);

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

  it('should verify a challenge', async () => {
    const challenge = justaname.signIn.requestSignIn({
      address: signer.address,
      subname: 'siwj.jaw.eth'
    })

    const signature = await signer.signMessage(challenge);
    const response = await justaname.signIn.signIn(challenge, signature);

    console.log(challenge)
    console.log(signature)
    expect(response).toBeDefined();

  })

  // it('should add a subname', async () => {
  //   const challenge = await justaname.siwe.requestChallenge({
  //     ttl:1800000,
  //     chainId: 1,
  //     origin: 'http://localhost:3333',
  //     address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
  //     domain: 'justaname.id',
  //   });
  //
  //   const signature = await signer.signMessage(challenge.challenge);
  //   const response = await justaname.subnames.addSubname({
  //     username: random
  //   });
  //
  //   // expect(response).toBeDefined();
  // })
})
