// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getJustaNameInstance, justanameConfig } from '../../../justaname';

interface QueryParams {
  address: string;
}

export default async function handler(
  req: NextApiRequest & { query: QueryParams },
  res: NextApiResponse
) {
  const { address } = req.query;
  const justaname = await getJustaNameInstance();

  try {
    const challenge = await justaname.siwe.requestChallenge({
      chainId: justanameConfig.chainId,
      origin: justanameConfig.origin,
      address,
      domain: justanameConfig.domain,
    });
    res.status(200).json(challenge);
  } catch (e) {
    res.status(500).json(e);
  }
}
