import { OffchainResolverResponse } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const offchainResolversKey = ['OFFCHAIN_RESOLVERS'];

interface UseOffchainResolversResult {
  offchainResolvers: OffchainResolverResponse[];
  isOffchainResolversPending: boolean;
}

export const useOffchainResolvers = (): UseOffchainResolversResult => {
  const { justaname } = useJustaName();

  const query = useQuery({
    queryKey: offchainResolversKey,
    queryFn: async () =>
      await justaname?.offchainResolvers.getAllOffchainResolvers(),
    enabled: Boolean(justaname),
  });

  return {
    offchainResolvers: query.data ?? [],
    isOffchainResolversPending: query.isPending,
  };
};
