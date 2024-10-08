import { SubnameChallenge } from '../../../lib/features/subname-challenge';
// import rest from '../../../lib/api/rest';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();
const signer = ethers.Wallet.createRandom();
describe('subnameChallenge', () => {

  let subnameChallenge: SubnameChallenge;

//   jest.spyOn(rest, 'restCall').mockResolvedValue({
// challenge: '0x1234',
//   })

  beforeEach(() => {
    subnameChallenge = new SubnameChallenge({
      siweConfig: {
        origin: 'http://localhost:3333',
        domain: 'localhost',
      },
      subnameChallengeTtl: 120000,
      chainId: 11155111
    })
  })

  it('should be able to request a challenge', async () => {
    const requestChallengeResponse = await subnameChallenge.requestChallenge({
      address: signer.address,
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