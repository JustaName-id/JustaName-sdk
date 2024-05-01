import { ChainId } from '@justaname.id/sdk';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { getJustaNameInstance } from '../../../justaname';

export async function POST(req: ExpoRequest): Promise<ExpoResponse> {
  const { username, message, signature, address } = await req.json();

  if (!username) {
    return new ExpoResponse('Username is required', { status: 400 });
  }

  if (!address) {
    return new ExpoResponse('Address is required', { status: 400 });
  }

  if (!signature) {
    return new ExpoResponse('Signature is required', { status: 400 });
  }

  if (!message) {
    return new ExpoResponse('Message is required', { status: 400 });
  }
  const justaname = await getJustaNameInstance();

  const chainId = parseInt(
    process.env.EXPO_PUBLIC_CHAIN_ID as string
  ) as ChainId;
  const ensDomain = process.env.EXPO_PUBLIC_ENS_DOMAIN as string;
  try {
    const subname = await justaname.subnames.addSubname(
      {
        username: username.split('.')[0],
        ensDomain,
        chainId,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );
    return ExpoResponse.json(subname);
  } catch (e: any) {
    console.log('claim error', e);
    return new ExpoResponse(e.message, { status: 500 });
  }
}
