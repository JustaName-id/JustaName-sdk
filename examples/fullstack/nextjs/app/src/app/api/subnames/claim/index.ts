// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SIWEHeaders } from '@justaname.id/sdk';
import { getJustaNameInstance, justanameConfig } from '../../../../justaname';

interface BodyParams extends SIWEHeaders {
  username: string;
}

export default async function handler(
  req: NextApiRequest & { body: BodyParams },
  res: NextApiResponse
) {
  const { username, xMessage, xSignature, xAddress } = req.body;
  const justaname = await getJustaNameInstance();

  try {
    const subname = await justaname.subnames.claimSubname(
      {
        username: username,
        ensDomain: justanameConfig.domain,
        chainId: justanameConfig.chainId,
      },
      {
        xSignature: xSignature,
        xAddress: xAddress,
        xMessage: xMessage,
      }
    );
    res.status(200).json(subname);
  } catch (e) {
    res.status(500).json(e);
  }
}
