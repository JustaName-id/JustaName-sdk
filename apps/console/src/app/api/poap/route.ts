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

  let poaps = [];

  try {
    const response = await axios.get(
      `https://api.poap.tech/actions/scan/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': process.env.POAP_API_KEY,
        },
      }
    );
    poaps = response.data;
  } catch (error) {
    console.error('Error fetching POAPs', error);
    return new Response('Error fetching POAPs', { status: 500 });
  }

  return new Response(JSON.stringify(poaps), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
