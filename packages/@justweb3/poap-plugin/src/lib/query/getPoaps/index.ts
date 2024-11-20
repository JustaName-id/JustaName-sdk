import axios from 'axios';
import { POAP } from '../../types';

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
