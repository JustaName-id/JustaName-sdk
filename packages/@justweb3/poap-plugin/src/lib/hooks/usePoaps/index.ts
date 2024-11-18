import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const buildPoapsQueryKey = (address: string | undefined) => {
  return ['POAPS_BY_ADDRESS', address];
};

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

export const getPoaps = async (address: string) => {
  const poaps = await axios.get<POAP[]>(
    `https://api.poap.tech/actions/scan/${address}`,
    {
      headers: {
        Accept: 'application/json',
        // TODO: handle api key functionality
        'x-api-key': '',
      },
    }
  );

  return poaps.data;
};

export interface UsePoapsParams {
  address: string;
}

export interface UsePoapsResult {
  poaps: POAP[] | undefined;
  isPoapsPending: boolean;
  isPoapsFetching: boolean;
  isPoapsLoading: boolean;
}

export const usePoaps = ({ address }: UsePoapsParams): UsePoapsResult => {
  const query = useQuery({
    queryKey: buildPoapsQueryKey(address),
    queryFn: () => getPoaps(address),
    enabled: Boolean(address),
  });

  return {
    poaps: query.data,
    isPoapsPending: query.isPending,
    isPoapsFetching: query.isFetching,
    isPoapsLoading: query.isPending || query.isFetching,
  };
};
