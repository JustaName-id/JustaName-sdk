import { useMutation, useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/browser-sdk';
import { useXMTPContext } from '../useXMTPContext';

const getInboxId = async (client: Client, address?: string) => {
  if (!address) return null;
  const inboxId = await client.findInboxIdByIdentifier({
    identifier: address,
    identifierKind: 'Ethereum',
  });
  if (!inboxId) return null;
  return inboxId;
};

export const useAddressInboxId = (address?: string) => {
  const { client } = useXMTPContext();

  const enabled = !!client && !!address;

  const query = useQuery({
    queryKey: ['INBOXID_BY_ADDRESS', address],
    queryFn: () => {
      if (!client || !address) return null;
      return getInboxId(client, address);
    },
    enabled,
  });

  const { mutateAsync: getInboxIdFromAddress, isPending } = useMutation({
    mutationFn: (peerAddress: `0x${string}`) => {
      if (!client) return Promise.resolve(null);
      return getInboxId(client, peerAddress);
    },
  });

  if (!client) {
    return {
      inboxId: null,
      getInboxId: () => Promise.resolve(null),
      inboxIdLoading: false,
    };
  }

  return {
    inboxId: query.data,
    getInboxId: getInboxIdFromAddress,
    inboxIdLoading: query.isLoading || isPending,
  };
};
