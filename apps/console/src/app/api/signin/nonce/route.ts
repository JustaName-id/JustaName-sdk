import { NextRequest, NextResponse } from 'next/server';
import { justaname, Session, tap } from '../../../../../lib';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const session = await Session.fromRequest(req)
  if (!session?.nonce) session.nonce = justaname.signIn.generateNonce()

  return tap(new NextResponse(session.nonce), res => session.persist(res))
}
