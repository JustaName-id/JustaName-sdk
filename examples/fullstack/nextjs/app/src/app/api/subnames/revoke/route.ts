// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChainId } from '@justaname.id/sdk'
import { NextRequest } from 'next/server'
import { getJustaNameInstance } from '../../../../justaname'

export async function POST(req: NextRequest) {
  const requestBody = await req.json()

  const { signature, address, message, ensDomain, username } = requestBody

  if (!signature) {
    throw Error('signature required')
  }

  if (!address) {
    throw Error('address required')
  }

  if (!message) {
    throw Error('message required')
  }
  const justaname = getJustaNameInstance()

  const chainId = parseInt(
    process.env.JUSTANAME_CHAIN_ID as string,
  ) as ChainId

  try {
    const subname = await justaname.subnames.revokeSubname(
      {
        username: username,
        ensDomain,
        chainId: chainId,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      },
    )
    return Response.json(subname)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return new Response(e.message, { status: 500 })
  }
}
