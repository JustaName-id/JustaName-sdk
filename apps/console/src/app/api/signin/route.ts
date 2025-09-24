import { NextRequest, NextResponse } from 'next/server';
import { getJustaname, Session, tap } from '../../../../lib';
import { SignInResponse } from '@justaname.id/sdk';

export const POST = async (req: NextRequest) => {
  const { message, signature } = await req.json();

  const session = await Session.fromRequest(req);

  let signInMessage: SignInResponse;

  try {
    signInMessage = await getJustaname().signIn.signIn({
      message,
      signature,
      nonce: session.nonce,
      domain: process.env.DOMAIN,
    });
  } catch (error) {
    return tap(new NextResponse(error.message, { status: 422 }), (res) =>
      session.clear(res)
    );
  }

  const { data: fields, ens, success, error } = signInMessage;

  if (!success) {
    return tap(
      new NextResponse(error?.type || 'something went wrong', { status: 422 }),
      (res) => session.clear(res)
    );
  }

  session.address = fields.address;
  session.chainId = fields.chainId;
  session.ens = ens;

  return tap(new NextResponse(''), (res) => session.persist(res));
};
