import { useMountedAccount } from '@justaname.id/react';
import { useQuery } from '@tanstack/react-query';
import { Conversation } from '@xmtp/browser-sdk';

const canMessageAddress = async (conversation: Conversation) => {
    const response = await conversation.messages();
    return response
}

export const useMessages = (conversation: Conversation) => {
    const {address} = useMountedAccount();

    const query = useQuery({
        queryKey: ['MESSAGES', address, conversation.id],
        queryFn: () => canMessageAddress(conversation),
        enabled: !!address && !!conversation,
    })

    return {
        messages: query.data ?? [],
        messagesLoading: query.isLoading,
    }
}