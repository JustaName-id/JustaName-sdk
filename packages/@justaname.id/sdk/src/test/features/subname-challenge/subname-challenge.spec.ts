import { SubnameChallenge } from '../../../lib/features/subname-challenge';
import rest from '../../../lib/api/rest';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

const pk = process.env['PRIVATE_KEY'] as string;
const signer = new ethers.Wallet(pk);
describe('subnameChallenge', () => {

  let subnameChallenge: SubnameChallenge;

  jest.spyOn(rest, 'restCall').mockResolvedValue({
challenge: '0x1234',
  })

  beforeEach(() => {
    subnameChallenge = new SubnameChallenge({
      chainId: 1,
      domain: 'localhost',
      origin: 'http://localhost:3333',
      ttl: 120000,
    })
  })

  it('should be able to request a challenge', async () => {
    const requestChallengeResponse = await subnameChallenge.requestChallenge({
      address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
    });
    expect(requestChallengeResponse).toBeDefined();
  })

  it('should be able to verify a challenge', async () => {
    const requestChallengeResponse = await subnameChallenge.requestChallenge({
      address: signer.address,
    });

    const signature = await signer.signMessage(requestChallengeResponse.challenge);

    const verifyChallengeResponse = await subnameChallenge.verifyMessage({
      message: requestChallengeResponse.challenge,
      signature,
      address: signer.address,
    });
    expect(verifyChallengeResponse.verified).toBeDefined();
  })
})