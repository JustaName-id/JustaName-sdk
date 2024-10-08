import { OffchainResolversGetAllRoute } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const OFFCHAIN_RESOLVERS_KEY = ['OFFCHAIN_RESOLVERS'];

interface UseOffchainResolversResult {
  offchainResolvers: OffchainResolversGetAllRoute['response'] | undefined;
  isOffchainResolversPending: boolean;
}

export const useOffchainResolvers = (): UseOffchainResolversResult => {
  const { justaname } = useJustaName();

  const query = useQuery({
    queryKey: OFFCHAIN_RESOLVERS_KEY,
    queryFn: () => justaname?.offchainResolvers.getAllOffchainResolvers(),
    enabled: Boolean(justaname),
  });

  return {
    offchainResolvers: query.data || { offchainResolvers: [] },
    isOffchainResolversPending: query.isPending,
  };
};
