import { OffchainResolverResponse } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../providers';

export const offchainResolversKey = ['OFFCHAIN_RESOLVERS'];

interface UseGetOffchainResolversResult {
  offchainResolvers: OffchainResolverResponse[];
  isLoading: boolean;
}

export const useGetOffchainResolvers = (): UseGetOffchainResolversResult => {
  const { justaname } = useJustaName();

  const query = useQuery({
    queryKey: offchainResolversKey,
    queryFn: async () =>
      await justaname?.offchainResolvers.getAllOffchainResolvers(),
    enabled: Boolean(justaname),
  });

  return {
    offchainResolvers: query.data ?? [],
    isLoading: query.isLoading,
  };
};
