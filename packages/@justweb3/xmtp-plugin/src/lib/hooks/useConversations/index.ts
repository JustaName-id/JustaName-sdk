import { useMountedAccount } from '@justaname.id/react';
import { useQuery } from '@tanstack/react-query';
import { Client, ConsentState, Conversation } from '@xmtp/browser-sdk';
import { useXMTPClient } from '../useClient';

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
            const peerAddress = convoMembers.find((member) => member.inboxId === peerInboxId)?.accountAddresses[0];
            const consent = await convo.consentState();
            const newConvo = {...convo, peerAddress, consent} as FullConversation;
            return newConvo;
        })
    );   
    const filtered = convosWithPeerAddress.filter((convo) => {
            return convo.peerAddress !== client.accountAddress;
        })
    return filtered;
}

export const useConversations = () => {
    const {address} = useMountedAccount();
    const {client} = useXMTPClient();

    if(!client) {
        throw new Error('Client not initialized');
    }

    const query = useQuery({
        queryKey: ['CONVERSATIONS', address],
        queryFn: () => getConversations(client),
        enabled: !!address,
    })

    return {
        conversations: query.data ?? [],
        conversationsLoading: query.isLoading,
    }
}