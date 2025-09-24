import { useMutation } from '@tanstack/react-query'
import { ContentTypeReply, Reply } from '@xmtp/content-type-reply'
import { ContentTypeText } from '@xmtp/content-type-text'

import { FullConversation } from '../useConversations'

export const sendReplyMessage = async (
    conversation: FullConversation,
    message: string,
    referenceId: string,
) => {
    const reply: Reply = {
        reference: referenceId,
        contentType: ContentTypeText,
        content: message,
    }
    return await conversation.send(reply, ContentTypeReply)
}

type SendReplyMessageParams = {
    message: string
    referenceId: string
}

export const useSendReplyMessage = (conversation?: FullConversation) => {

    return useMutation({
        mutationFn: ({ message, referenceId }: SendReplyMessageParams) => {
            if (!conversation) throw new Error('Conversation not found')
            return sendReplyMessage(
                conversation,
                message,
                referenceId,
            )
        },
    })
}
