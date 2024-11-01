import { Session, tap } from '../../../../lib';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const session = await Session.fromRequest(req)
  if (!session.address) {
    return tap(new NextResponse(''), res => session.clear(res))
  }
  return NextResponse.json(session.toJSON())
}