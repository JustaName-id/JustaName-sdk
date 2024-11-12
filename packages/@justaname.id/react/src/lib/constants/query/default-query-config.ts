import { NetworkMode } from '@tanstack/react-query';

export const defaultQueryConfig = {
  staleTime: 1000 * 60 * 5,
  networkMode: 'offlineFirst' as NetworkMode,
  refetchOnWindowFocus: false,
  retry: 0,
};
