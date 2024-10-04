import { OffchainResolverResponse } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const OFFCHAIN_RESOLVERS_KEY = ['OFFCHAIN_RESOLVERS'];

interface UseOffchainResolversResult {
  offchainResolvers: OffchainResolverResponse[];
  isOffchainResolversPending: boolean;
}

export const useOffchainResolvers = (): UseOffchainResolversResult => {
  const { justaname } = useJustaName();

  const query = useQuery({
    queryKey: OFFCHAIN_RESOLVERS_KEY,
    queryFn: () => justaname?.offchainResolvers.getAllOffchainResolvers(),
    enabled: Boolean(justaname),
    initialData: [],
  });

  return {
    offchainResolvers: query.data,
    isOffchainResolversPending: query.isPending,
  };
};
