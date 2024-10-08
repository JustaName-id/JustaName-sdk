import { Subnames} from '../../../lib/features';
import { TextRecord, Address } from '../../../lib/types'
import { sanitizeAddresses, sanitizeTexts } from '../../../lib/utils';
import { JustaName } from '../../../lib/justaname';
import { InvalidConfigurationException } from '../../../lib/errors';

const CHAIN_ID = 1;
const ENS_DOMAIN = 'justaname.eth';

describe('Subnames', () => {

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

    const textArray = sanitizeTexts(text)
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

    const addressArray = sanitizeAddresses(addresses)
    expect(addressArray).toEqual(addressRequest)
  })

  it('should throw error on operation needs an apiKey', async () => {
    const subnamesWithoutApiKey = new Subnames({
      chainId: CHAIN_ID,
      networks: JustaName.createNetworks(),
      ensDomains: [{chainId: CHAIN_ID, ensDomain: ENS_DOMAIN}]
    })

    expect(() => subnamesWithoutApiKey.addSubname({
      username: 'jan',
    }, {
      xSignature: 'signature',
      xMessage: 'message',
      xAddress: 'address',
    })).rejects.toThrow(InvalidConfigurationException.missingHeaders(['xApiKey']))
  })
})