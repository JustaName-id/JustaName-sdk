import { NextRequest, NextResponse } from 'next/server';
import { getJustaname, Session, tap } from '../../../../../lib';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const session = await Session.fromRequest(req);
  if (!session?.nonce) session.nonce = getJustaname().signIn.generateNonce();

  return tap(new NextResponse(session.nonce), (res) => session.persist(res));
};
