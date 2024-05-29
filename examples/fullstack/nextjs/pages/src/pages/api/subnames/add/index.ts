// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChainId } from '@justaname.id/sdk';
import { getJustaNameInstance } from '../../../../justaname';
import {NextApiRequest, NextApiResponse} from "next";


interface BodyParams {
  username: string
  message: string
  signature: string
  address: string
}
export default async function handler(
    req: NextApiRequest & { body: BodyParams },
    res: NextApiResponse
) {
  const { signature, address, message, username } = req.body;

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
  const justaname =  getJustaNameInstance();

  const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId
  const domain = process.env.JUSTANAME_DOMAIN as string;
  const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;
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
    res.status(200).json(subname)
  } catch (e) {
    res.status(500).json(e);
  }
}
