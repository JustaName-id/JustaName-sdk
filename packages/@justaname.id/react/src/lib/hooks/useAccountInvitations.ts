import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useJustaName } from '../providers';
import { useMounted } from './useMounted';

export const buildAccountInvitationsKey = (address: string | undefined) => [
  'INVITATIONS_BY_ADDRESS',
  address,
];

type SubnameType = SubnameGetAllByAddressResponse[];

interface UseAccountInvitationsResult {
  invitations: SubnameType;
  isLoading: boolean;
  refetchInvitations: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameType | undefined, unknown>>;
}
export const useAccountInvitations = (): UseAccountInvitationsResult => {
  const mounted = useMounted();
  const { address } = useAccount();
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildAccountInvitationsKey(address),
    queryFn: async () =>
      justaname?.subnames.getInvitations({
        address: address as string,
        isClaimed: true,
        coinType: 60,
        chainId: chainId,
      }),
    enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname),
  });

  return {
    invitations: query.data ?? [],
    isLoading: query.isLoading,
    refetchInvitations: query.refetch,
  };
};
