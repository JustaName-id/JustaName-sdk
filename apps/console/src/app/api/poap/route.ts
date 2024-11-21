import { NextRequest } from 'next/server';
import axios from 'axios';

export interface POAP {
  event: Event;
  tokenId: string;
  owner: string;
  chain: string;
  created: Date;
}

export interface Event {
  id: number;
  fancy_id: string;
  name: string;
  event_url: string;
  image_url: string;
  country: string;
  city: string;
  description: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  supply: number;
}

interface QueryParams {
  address: string;
}

export async function GET(req: NextRequest & { query: QueryParams }) {
  const { searchParams } = req.nextUrl;
  const address = searchParams.get('address');

  if (!address) {
    return new Response('Address is required', { status: 400 });
  }

  let poaps: POAP[] = [];

  try {
    const response = await axios.get<POAP[]>(
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
