import { ChainId, SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { useJustaName } from '../../providers';
import { useMounted } from './useMounted';

export const buildAccountInvitationsKey = (
  address: string | undefined,
  chainId: ChainId
) => [
  'INVITATIONS_BY_ADDRESS',
  address,
  chainId,
];

type SubnameType = SubnameGetAllByAddressResponse[];

interface UseAccountInvitationsResult {
  invitations: SubnameType;
  isInvitationsPending: boolean;
  refetchInvitations: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameType | undefined, unknown>>;
}

/**
 * Options for the `useAccountSubnames` hook, allowing customization of the query.
 *
 * @typedef UseAccountInvitationsOptions
 * @type {object}
 * @property {ChainId} [chainId] - An optional chain ID to filter the subnames by.
 */
export interface UseAccountInvitationsOptions {
  chainId?: ChainId;
}

export const useAccountInvitations = (
  props: UseAccountInvitationsOptions = {}
): UseAccountInvitationsResult => {
  const mounted = useMounted();
  const { address } = useAccount();
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildAccountInvitationsKey(address, props?.chainId ? props?.chainId : chainId),
    queryFn: async () =>
      justaname.subnames.getInvitations({
        address: address as string,
        isClaimed: true,
        coinType: 60,
        chainId: props?.chainId ? props?.chainId : chainId,
      }),
    enabled: Boolean(mounted) && Boolean(address),
  });

  return {
    invitations: query.data ?? [],
    isInvitationsPending: query.isPending,
    refetchInvitations: query.refetch,
  };
};
