// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getJustaNameInstance } from '../../../justaname';
import { NextRequest } from 'next/server';
import { ChainId } from '@justaname.id/sdk';

export  async function GET(
  req: NextRequest,
) {
  const { searchParams } = req.nextUrl

  const address = searchParams.get('address');

  if(!address) {
    return new Response('Address is required', { status: 400 });
  }

  const justaname = await getJustaNameInstance();
  const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId
  const origin = process.env.JUSTANAME_ORIGIN as string
  const domain = process.env.JUSTANAME_DOMAIN as string
  try {
    const challenge = await justaname.siwe.requestChallenge({
      chainId,
      origin,
      address,
      domain,
    });
   return Response.json(challenge);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
