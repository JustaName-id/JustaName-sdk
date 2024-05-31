// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChainId } from '@justaname.id/sdk';
import { getJustaNameInstance } from '../../../../justaname';
import { NextRequest } from 'next/server';

export  async function POST(
  req: NextRequest
) {
    const requestBody = await req.json()
  const { username, message, signature, address } = requestBody;

  if(!username) {
    return new Response('Username is required', { status: 400 });
  }

  if(!address ) {
    return new Response('Address is required', { status: 400 });
  }

  if(!signature) {
    return new Response('Signature is required', { status: 400 });
  }

  if(!message) {
    return new Response('Message is required', { status: 400 });
  }
  const justaname = getJustaNameInstance();

  const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId
  const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string
  try {
    const subname = await justaname.subnames.addSubname(
      {
        username: username,
        ensDomain,
        chainId
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );
    return Response.json(subname);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
