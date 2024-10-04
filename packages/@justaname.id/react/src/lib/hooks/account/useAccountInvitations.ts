import { ChainId, SubnameGetInvitationsByAddressParams, SubnameGetInvitationsByAddressResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers/JustaNameProvider';
import { useMemo } from 'react';
import { useMountedAccount } from './useMountedAccount';

export const buildAccountInvitationsKey = (
  address: string | undefined,
  chainId: ChainId
) => [
  'INVITATIONS_BY_ADDRESS',
  address,
  chainId,
];

interface UseAccountInvitationsResult {
  invitations: SubnameGetInvitationsByAddressResponse;
  isInvitationsPending: boolean;
  refetchInvitations: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameGetInvitationsByAddressResponse | undefined, unknown>>;
}

export type UseAccountInvitationsParams = Omit<SubnameGetInvitationsByAddressParams, 'address'>

export const useAccountInvitations = (
  params?: UseAccountInvitationsParams
): UseAccountInvitationsResult => {
  const { address } = useMountedAccount();
  const { justaname, chainId } = useJustaName();
  const _chainId = useMemo(() => params?.chainId || chainId, [params, chainId]);


  const query = useQuery({
    queryKey: buildAccountInvitationsKey(address, _chainId),
    queryFn: async () =>
      justaname.subnames.getInvitations({
        address: address as string,
        coinType: params?.coinType || 60,
        chainId: _chainId,
      }),
    enabled: Boolean(address),
    initialData: {
      subnames: [],
    },
  });

  return {
    invitations: query.data,
    isInvitationsPending: query.isPending,
    refetchInvitations: query.refetch,
  };
};
