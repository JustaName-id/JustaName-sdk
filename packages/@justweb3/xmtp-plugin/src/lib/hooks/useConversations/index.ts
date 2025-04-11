import { useMountedAccount } from '@justaname.id/react';
import { useQuery } from '@tanstack/react-query';
import {
  Client,
  ConsentState,
  Conversation,
  Dm,
  Group,
  SafeGroupMember,
} from '@xmtp/browser-sdk';
import { useCallback, useState } from 'react';
import { useXMTPContext } from '../useXMTPContext';

export interface FullConversation extends Conversation {
  peerAddress: string;
  consent: ConsentState;
}

export interface FullGroup extends Group {
  groupMembers: SafeGroupMember[];
  membersAddress: string[];
  consent: ConsentState;
}

const convertGroups = async (
  groups: Group[],
  clientInboxId: string
): Promise<FullGroup[]> => {
  const groupsWithAddresses: FullGroup[] = await Promise.all(
    groups.map(async (group) => {
      const groupMembers = await group.members();

      const membersWithoutClient = groupMembers.filter(
        (member) => member.inboxId !== clientInboxId
      );

      const membersAddresses = membersWithoutClient.map((member) => {
        const memberIdentifiers = member.accountIdentifiers.find(
          (i) => i.identifierKind === 'Ethereum'
        );
        return memberIdentifiers ? memberIdentifiers.identifier : '';
      });

      const fullGroup = group as unknown as FullGroup;
      fullGroup.membersAddress = membersAddresses;
      fullGroup.groupMembers = membersWithoutClient;

      return fullGroup;
    })
  );
  return groupsWithAddresses;
};

const convertConversations = async (
  convos: Dm[],
  consentState: ConsentState
): Promise<FullConversation[]> => {
  const convosWithPeerAddress: FullConversation[] = await Promise.all(
    convos.map(async (convo) => {
      const peerInboxId = await convo.peerInboxId();
      const convoMembers = await convo.members();
      const peerIdentifiers = convoMembers.find(
        (member) => member.inboxId === peerInboxId
      )?.accountIdentifiers;

      const peerAddress = peerIdentifiers
        ?.filter((i) => i.identifierKind === 'Ethereum')
        .map((i) => i.identifier);

      const fullConvo = convo as unknown as FullConversation;
      fullConvo.peerAddress = peerAddress ? peerAddress[0] : '';
      fullConvo.consent = consentState;

      return fullConvo;
    })
  );
  return convosWithPeerAddress;
};

const filterOwnConversations = (
  convos: FullConversation[],
  clientAddress: string
) => {
  return convos.filter((convo) => convo.peerAddress !== clientAddress);
};

const getConversations = async (client: Client) => {
  const allowedConvos = await client.conversations.listDms({
    consentStates: [ConsentState.Allowed],
  });
  const blockedConvos = await client.conversations.listDms({
    consentStates: [ConsentState.Denied],
  });
  const requestedConvos = await client.conversations.listDms({
    consentStates: [ConsentState.Unknown],
  });
  const allowedGroups = await client.conversations.listGroups({
    consentStates: [ConsentState.Allowed],
  });
  const blockedGroups = await client.conversations.listGroups({
    consentStates: [ConsentState.Denied],
  });
  const requestedGroups = await client.conversations.listGroups({
    consentStates: [ConsentState.Unknown],
  });

  const allowedConvosWithPeerAddress = await convertConversations(
    allowedConvos,
    ConsentState.Allowed
  );
  const blockedConvosWithPeerAddress = await convertConversations(
    blockedConvos,
    ConsentState.Denied
  );
  const requestedConvosWithPeerAddress = await convertConversations(
    requestedConvos,
    ConsentState.Unknown
  );

  const allowedGroupsWithAddresses = await convertGroups(
    allowedGroups,
    client.inboxId ?? ''
  );
  const blockedGroupsWithAddresses = await convertGroups(
    blockedGroups,
    client.inboxId ?? ''
  );
  const requestedGroupsWithAddresses = await convertGroups(
    requestedGroups,
    client.inboxId ?? ''
  );

  const clientIdentifier = await client.accountIdentifier();
  const filteredAllowedConvos = filterOwnConversations(
    allowedConvosWithPeerAddress,
    clientIdentifier.identifier
  );
  const filteredBlockedConvos = filterOwnConversations(
    blockedConvosWithPeerAddress,
    clientIdentifier.identifier
  );
  const filteredRequestedConvos = filterOwnConversations(
    requestedConvosWithPeerAddress,
    clientIdentifier.identifier
  );

  return {
    allowed: filteredAllowedConvos,
    blocked: filteredBlockedConvos,
    requested: filteredRequestedConvos,
    groups: {
      allowed: allowedGroupsWithAddresses,
      blocked: blockedGroupsWithAddresses,
      requested: requestedGroupsWithAddresses,
    },
  };
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
    queryKey: ['CONVERSATIONS_BY_CLIENT', address, client?.inboxId],
    queryFn: async () => {
      if (!client)
        return {
          allowed: [],
          blocked: [],
          requested: [],
          groups: {
            allowed: [],
            blocked: [],
            requested: [],
          },
        };
      await sync();
      return getConversations(client);
    },
    enabled: !!address && !!client,
  });

  return {
    conversations: query.data
      ? {
          allowed: query.data.allowed,
          blocked: query.data.blocked,
          requested: query.data.requested,
        }
      : { allowed: [], blocked: [], requested: [] },
    groups: query.data?.groups ?? { allowed: [], blocked: [], requested: [] },
    conversationsLoading: query.isLoading,
    sync,
    syncing,
    refetchConvos: query.refetch,
  };
};
