import { useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/browser-sdk';
import { useXMTPContext } from '../useXMTPContext';

const getInboxId = async (client: Client, address?: string) => {
  if (!client) return null;
  const clientIdentifier = await client.accountIdentifier();
  if (!clientIdentifier) return null;
  return clientIdentifier.identifier;
};

export const useClientAddress = () => {
  const { client } = useXMTPContext();

  const query = useQuery({
    queryKey: ['CLIENT_ADDRESS_BY_INBOXID', client?.inboxId],
    queryFn: () => {
      if (!client) return null;
      return getInboxId(client, client?.inboxId);
    },
    enabled: !!client,
  });

  return {
    clientAddress: query.data,
    clientAddressLoading: query.isLoading,
  };
};
