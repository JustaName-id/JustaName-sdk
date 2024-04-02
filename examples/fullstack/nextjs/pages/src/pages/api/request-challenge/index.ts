// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextRequest } from 'next/server';
import {NextApiRequest, NextApiResponse} from "next";
import { getJustaNameInstance} from '../../../justaname'
import { ChainId } from '@justaname.id/sdk'
interface QueryParams {
  address: string;
}

export default async function handler(
    req: NextApiRequest & { query: QueryParams },
    res: NextApiResponse
) {

  const address = req.query.address

  if(!address) {
    return new Response('Address is required', { status: 400 });
  }

  const justaname = await getJustaNameInstance();
  const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId
  const origin = process.env.JUSTANAME_ORIGIN as string
  const domain = process.env.JUSTANAME_DOMAIN as string
  try {
    const challenge = await justaname.siwe.requestChallenge({
      // 30mins
      ttl:1800000,
      chainId,
      origin,
      address,
      domain,
    });
   res.status(200).json(challenge)
  } catch (e) {
    res.status(500).json(e);
  }
}
