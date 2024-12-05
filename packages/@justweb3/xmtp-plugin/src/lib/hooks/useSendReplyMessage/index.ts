import { useMutation } from '@tanstack/react-query'
import { ContentTypeId } from '@xmtp/content-type-primitives'
import { ContentTypeReply, Reply } from '@xmtp/content-type-reply'
import { ContentTypeText } from '@xmtp/content-type-text'
import {
    CachedConversation,
    useSendMessage,
    DecodedMessage,
    SendOptions,
} from '@xmtp/react-sdk'

export const sendReplyMessage = async (
    conversation: CachedConversation,
    message: string,
    referenceId: string,
    sendMessage: <T = string>(
        conversation: CachedConversation,
        content: T,
        contentType?: ContentTypeId,
        sendOptions?: Omit<SendOptions, 'contentType'>,
    ) => Promise<DecodedMessage<any> | undefined>,
) => {
    const reply: Reply = {
        reference: referenceId,
        contentType: ContentTypeText,
        content: message,
    }
    return await sendMessage(conversation, reply, ContentTypeReply)
}

type SendReplyMessageParams = {
    message: string
    referenceId: string
}

export const useSendReplyMessage = (conversation?: CachedConversation) => {
    const { sendMessage } = useSendMessage()

    return useMutation({
        mutationFn: ({ message, referenceId }: SendReplyMessageParams) => {
            if (!conversation) throw new Error('Conversation not found')
            return sendReplyMessage(
                conversation,
                message,
                referenceId,
                sendMessage,
            )
        },
    })
}
