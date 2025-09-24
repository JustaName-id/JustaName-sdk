import { NextRequest } from 'next/server';
import axios from 'axios';

interface QueryParams {
  address: string;
}

export async function GET(req: NextRequest & { query: QueryParams }) {
  const { searchParams } = req.nextUrl;
  const address = searchParams.get('address');

  if (!address) {
    return new Response('Address is required', { status: 400 });
  }

  let credentials;

  try {
    const response = await axios.get(
      `https://api.talentprotocol.com/api/v2/passport_credentials?passport_id=${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': process.env.TALENT_PROTOCOL_API_KEY,
        },
      }
    );
    credentials = response.data;
  } catch (error) {
    console.error('Error fetching POAPs', error);
    return new Response('Error fetching Credentials', { status: 500 });
  }

  return new Response(JSON.stringify(credentials), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
