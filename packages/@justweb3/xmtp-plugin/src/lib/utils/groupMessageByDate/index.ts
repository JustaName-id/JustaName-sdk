import { MessageWithReaction } from '../filterReactionsMessages'

interface GroupedMessages {
    [date: string]: MessageWithReaction[]
}

const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
    }
    const formattedDate = date
        .toLocaleDateString('en-US', options)
        .toUpperCase()
    const parts = formattedDate.split(' ')
    return `${parts[0]} ${parts[1]} ${parts[2]}`
}

export const groupMessagesByDate = (
    messages: MessageWithReaction[],
): GroupedMessages => {
    const groupedMessages = messages.reduce<GroupedMessages>((acc, message) => {
        const date = new Date(message.sentAt)
        const formattedDate = getFormattedDate(date)

        if (!acc[formattedDate]) {
            acc[formattedDate] = []
        }

        acc[formattedDate].push(message)

        return acc
    }, {})

    return groupedMessages
}
