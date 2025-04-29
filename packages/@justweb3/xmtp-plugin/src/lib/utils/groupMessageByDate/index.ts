import { MessageWithReaction } from '../filterReactionsMessages';

interface GroupedMessages {
  [date: string]: MessageWithReaction[];
}

const getFormattedDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  };
  const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
  const parts = formattedDate.split(' ');
  return `${parts[0]} ${parts[1]} ${parts[2]}`;
};

const convertNanosToDate = (sentAtNs: string | number | bigint): Date => {
  if (typeof sentAtNs === 'bigint') {
    return new Date(Number(sentAtNs / BigInt(1000000)));
  }

  if (typeof sentAtNs === 'string' && sentAtNs.endsWith('n')) {
    const bigIntValue = BigInt(sentAtNs.slice(0, -1));
    return new Date(Number(bigIntValue / BigInt(1000000)));
  }

  return new Date(Number(sentAtNs) / 1000000);
};

export const groupMessagesByDate = (
  messages: MessageWithReaction[]
): GroupedMessages => {
  const groupedMessages = messages.reduce<GroupedMessages>((acc, message) => {
    const date = convertNanosToDate(message.sentAtNs);
    const formattedDate = getFormattedDate(date);

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }

    acc[formattedDate].push(message);

    return acc;
  }, {});

  return groupedMessages;
};
