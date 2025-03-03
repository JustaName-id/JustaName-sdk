import { useMutation, useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/browser-sdk';
import { useXMTPContext } from '../useXMTPContext';

const getInboxId = async (client: Client, address?: string) => {
  if (!address) return;
  const inboxId = await client.findInboxIdByAddress(address);
  if (!inboxId) return;
  return inboxId;
};

export const useAddressInboxId = (address?: string) => {
  const { client } = useXMTPContext();

  if (!client) {
    // throw new Error('Client not initialized');
    return {
      inboxId: undefined,
      getInboxId: () => {},
      inboxIdLoading: false,
    };
  }

  const query = useQuery({
    queryKey: ['INBOXID_BY_ADDRESS', address],
    queryFn: () => getInboxId(client),
    enabled: !!address,
  });

  const { mutateAsync: getInboxIdFromAddress, isPending } = useMutation({
    mutationFn: (peerAddress: `0x${string}`) => getInboxId(client, peerAddress),
  });

  return {
    inboxId: query.data,
    getInboxId: getInboxIdFromAddress,
    inboxIdLoading: query.isLoading || isPending,
  };
};
