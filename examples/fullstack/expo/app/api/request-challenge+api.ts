import { ChainId } from '@justaname.id/sdk';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getJustaNameInstance } from '../../justaname';

export async function GET(req: ExpoRequest): Promise<ExpoResponse> {
  const { searchParams } = req.expoUrl;

  const address = searchParams.get('address');

  if (!address) {
    return new ExpoResponse('Address is required', { status: 400 });
  }

  const justaname = await getJustaNameInstance();
  const chainId = parseInt(
    process.env.EXPO_PUBLIC_CHAIN_ID as string
  ) as ChainId;
  const origin = 'exp://192.168.1.5:8081';
  const domain = process.env.EXPO_PUBLIC_ENS_DOMAIN as string;

  try {
    const challenge = await justaname.siwe.requestChallenge({
      // 30mins
      ttl:1800000,
      chainId,
      origin,
      address,
      domain,
    });
    return ExpoResponse.json(challenge);
  } catch (e: any) {
    return new ExpoResponse(e.message, { status: 500 });
  }
}
