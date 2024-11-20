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

export const getPoaps = async (
  address: string,
  apiKey?: string,
  backendUrl?: string
) => {
  if (backendUrl) {
    const poaps = await axios.get<POAP[]>(
      `${backendUrl}/api/poap?address=${address}`
    );
    return poaps.data;
  }

  const poaps = await axios.get<POAP[]>(
    `https://api.poap.tech/actions/scan/${address}`,
    {
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey || '',
      },
    }
  );

  return poaps.data;
};
