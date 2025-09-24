import { NetworkMode } from '@tanstack/react-query';

export const defaultOptions = {
  staleTime: 1000 * 60 * 5,
  networkMode: 'offlineFirst' as NetworkMode,
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: 1000,
  retryOnMount: false,
};
