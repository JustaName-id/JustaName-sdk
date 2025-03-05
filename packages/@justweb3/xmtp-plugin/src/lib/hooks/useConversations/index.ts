import { useMountedAccount } from '@justaname.id/react';
import { useQuery } from '@tanstack/react-query';
import { Client, ConsentState, Conversation } from '@xmtp/browser-sdk';
import { useCallback, useState } from 'react';
import { useXMTPContext } from '../useXMTPContext';

export interface FullConversation extends Conversation {
  peerAddress: string;
  consent: ConsentState;
}

const getConversations = async (client: Client) => {
  const convos = await client.conversations.listDms();
  const convosWithPeerAddress: FullConversation[] = await Promise.all(
    convos.map(async (convo) => {
      const peerInboxId = await convo.dmPeerInboxId();
      const convoMembers = await convo.members();
      const peerAddress = convoMembers.find(
        (member) => member.inboxId === peerInboxId
      )?.accountAddresses[0];
      const consent = await convo.consentState();

      (convo as FullConversation).peerAddress = peerAddress || '';
      (convo as FullConversation).consent = consent;

      return convo as FullConversation;
    })
  );
  const filtered = convosWithPeerAddress.filter((convo) => {
    return convo.peerAddress !== client.accountAddress;
  });
  return filtered;
};

export const useConversations = () => {
  const { address } = useMountedAccount();
  const { client } = useXMTPContext();
  const [syncing, setSyncing] = useState(false);

  const sync = useCallback(async () => {
    if (!client) return;
    setSyncing(true);
    try {
      await client.conversations.syncAll();
    } finally {
      setSyncing(false);
    }
  }, [client]);

  const query = useQuery({
    queryKey: ['CONVERSATIONS', address],
    queryFn: async () => {
      if (!client) return [];
      await sync();
      return getConversations(client);
    },
    enabled: !!address && !!client,
  });

  return {
    conversations: query.data ?? [],
    conversationsLoading: query.isLoading,
    sync,
    syncing,
  };
};
