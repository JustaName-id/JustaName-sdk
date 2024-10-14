import { NextRequest, NextResponse } from 'next/server';
import { Session, tap } from '../../../../lib';

export const POST = async (req: NextRequest) => {
  const session = await Session.fromRequest(req)
  return tap(new NextResponse(''), res => session.clear(res))
}