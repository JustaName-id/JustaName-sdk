import { useMountedAccount } from '@justaname.id/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Client, Identifier } from '@xmtp/browser-sdk';
import { useXMTPContext } from '../useXMTPContext';

const canMessageAddress = async (
  peerAddress?: `0x${string}`,
  client?: Client
) => {
  if (!peerAddress || !client) return false;
  const peerIdentifier: Identifier = {
    identifier: peerAddress,
    identifierKind: 'Ethereum',
  };
  try {
    const response = await client.findInboxIdByIdentifier(peerIdentifier);
    return !!response;
  } catch (error) {
    return false;
  }
};

export const useCanMessage = (peerAddress?: `0x${string}`) => {
  const { address } = useMountedAccount();
  const { client } = useXMTPContext();

  const query = useQuery({
    queryKey: ['CAN_MESSAGE', address, peerAddress],
    queryFn: () => canMessageAddress(peerAddress, client),
    enabled: !!address && !!peerAddress && !!client,
  });

  const { mutateAsync: canMessageFn, isPending: canMessageLoading } =
    useMutation({
      mutationFn: (peerAddress: `0x${string}`) =>
        canMessageAddress(peerAddress, client),
    });

  return {
    canMessage: query.data,
    canMessageLoading: query.isLoading || canMessageLoading,
    canMessageFn,
  };
};
