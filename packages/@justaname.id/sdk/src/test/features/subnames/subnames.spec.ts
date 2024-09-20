import { Subnames} from '../../../lib/features';
import { TextRecord, Address } from '../../../lib/types'
import { ApiKeyRequiredException } from '../../../lib/errors/ApiKeyRequired.exception';

const PROVIDER_URL = 'https://mainnet.infura.io/v3/your-infura-project-id';
const CHAIN_ID = 1;
const ENS_DOMAIN = 'justaname.eth';
const validApiKey = process.env['SDK_JUSTANAME_TEST_API_KEY'] as string;

describe('Subnames', () => {

  let subnames = new Subnames(
    PROVIDER_URL,
    ENS_DOMAIN,
    CHAIN_ID,
    validApiKey
  )

  it('should be able to transform json text records to TextRecord', () => {
    const text = {
      'com.twitter': '@justaname',
      'com.youtube': 'justaname'
    }

    const textRequest: TextRecord[] = [{
      key: 'com.twitter',
      value: '@justaname'
    }, {
      key: 'com.youtube',
      value: 'justaname'
    }]

    const textArray = subnames.jsonToArrayOfKeyValue(text, 'key', 'value')
    expect(textArray).toEqual(textRequest)
  })

  it('should be able to transform json addresses to Address', () => {
    const addresses = {
      '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      '60': '0xb965a5f3a0fC18D84E68883ccAd508445a7917A8',
    }

    const addressRequest: Address[] = [
      {
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        coinType: 0,
      },
      {
        address: '0xb965a5f3a0fC18D84E68883ccAd508445a7917A8',
        coinType: 60,
      }
    ]

    const addressArray = subnames.jsonToArrayOfKeyValue(addresses, 'coinType', 'address').map((address) => {
      return {
        address: address.address,
        coinType: parseInt(address.coinType)
      }
    })
    expect(addressArray).toEqual(addressRequest)
  })

  it('should throw error on operation needs an apiKey', async () => {
    const subnamesWithoutApiKey = new Subnames(
      PROVIDER_URL,
      ENS_DOMAIN,
      CHAIN_ID,
    )

    expect(subnamesWithoutApiKey.addSubname({
      username: 'jan',
    }, {
      xSignature: 'signature',
      xMessage: 'message',
      xAddress: 'address',
    })).rejects.toThrow(ApiKeyRequiredException.apiKeyRequired())
  })
})