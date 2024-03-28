import { JustaName } from '../../lib/justaname';
import { configureEnv } from '../helpers/configureEnv';
import { initializeJustaName } from '../helpers/initializeJustaName';

const invalidApiKey = 'invalid-api-key';

jest.setTimeout(50000);

describe('justaname', () => {

  let justaname: JustaName;

  beforeAll(async () => {
    await configureEnv();
    justaname = await initializeJustaName(process.env['JUSTANAME_TEST_API_KEY'] as string);
  })

  it('should throw an error if the API key is not present', () => {
    return initializeJustaName('').catch((e) => {
      expect(e).toEqual(new Error('API key is required'));
    })

  })

  it('should throw an error if the API key is invalid', () => {
    return initializeJustaName(invalidApiKey).catch((e) => {
      expect(e).toEqual(new Error(`ApiKeyNotFoundException: Api Key with Key ${invalidApiKey} not found`));
    })
  })

  it('should initialize JustaName', () => {
    expect(justaname).toBeInstanceOf(JustaName)
    expect(justaname).toBeDefined();
  })

  it('should request a challenge', async () => {
    const challenge = await justaname.siwe.requestChallenge({
      ttl:1800000,
      chainId: 1,
      origin: 'http://localhost:3333',
      address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
      domain: 'justaname.id',
    });
    expect(challenge).toBeDefined();
  })
})
