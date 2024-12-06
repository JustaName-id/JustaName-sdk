import { Flex } from '@justweb3/ui';
import { MessageSkeletonCard } from './MessageSkeletonCard';

interface LoadingMessagesListProps {
  computeHeight: string;
}

export const LoadingMessagesList: React.FC<LoadingMessagesListProps> = ({
  computeHeight,
}) => (
  <Flex
    direction="column"
    gap="5px"
    style={{
      flex: 1,
      paddingTop: 20,
      minHeight: `calc( ${computeHeight} - 20px )`,
      maxHeight: `calc( ${computeHeight} - 20px )`,
    }}
  >
    {Array.from({ length: 8 }).map((_, index) => (
      <MessageSkeletonCard key={index} isReceiver={index % 2 === 0} />
    ))}
  </Flex>
);
