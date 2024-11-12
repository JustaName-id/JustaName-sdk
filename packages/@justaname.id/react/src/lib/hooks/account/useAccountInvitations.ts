import {
  ChainId,
  sanitizeRecords,
  SubnameGetInvitationsByAddressRoute,
} from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers/JustaNameProvider';
import { useMemo } from 'react';
import { useMountedAccount } from './useMountedAccount';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

export const buildAccountInvitationsKey = (
  address: string | undefined,
  chainId: ChainId | undefined
) => ['INVITATIONS_BY_ADDRESS', address, chainId];

interface UseAccountInvitationsResult {
  invitations: Records[];
  isInvitationsPending: boolean;
  refetchInvitations: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Records[] | undefined, unknown>>;
}

export type UseAccountInvitationsParams = Omit<
  SubnameGetInvitationsByAddressRoute['params'],
  'address'
>;

export const useAccountInvitations = (
  params?: UseAccountInvitationsParams
): UseAccountInvitationsResult => {
  const { address } = useMountedAccount();
  const { justaname, chainId } = useJustaName();
  const _chainId = useMemo(() => params?.chainId || chainId, [params, chainId]);

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildAccountInvitationsKey(address, _chainId),
    queryFn: async () => {
      const invitations = await justaname.subnames.getInvitationsByAddress({
        address: address as string,
        coinType: params?.coinType || 60,
        chainId: _chainId,
      });
      return (
        invitations?.subnames.map((subname) => ({
          ...subname,
          sanitizedRecords: sanitizeRecords(subname),
        })) || []
      );
    },
    enabled: Boolean(address),
  });

  return {
    invitations: query.data || [],
    isInvitationsPending: query.isPending,
    refetchInvitations: query.refetch,
  };
};
