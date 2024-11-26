import { Skeleton, Flex } from '@justweb3/ui';

interface MessageSkeletonCardProps {
  isReceiver: boolean;
}

export const MessageSkeletonCard: React.FC<MessageSkeletonCardProps> = ({ isReceiver }) => {
  return (
    <Flex direction="column" gap='5px' align={isReceiver ? 'flex-start' : 'flex-end'} style={{
      padding: '5px 0',
      width: 'fit-content',
      paddingRight: isReceiver ? '40px' : '0',
      paddingLeft: isReceiver ? '0' : '40px',
      marginLeft: isReceiver ? '0' : 'auto',
    }} >
      <Skeleton style={{
        minWidth: '100px',
        maxWidth: '170px',
        width: '170px',
        minHeight: '40px',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowWrap: 'break-word',
        borderRadius: '10px',
        border: '1px solid var(--justweb3-primary-color)',
        color: 'black',
        background: isReceiver ? '#dff0ff26' : '#88C6F526',
        borderBottomLeftRadius: isReceiver ? '0' : '10px',
        borderBottomRightRadius: isReceiver ? '10px' : '0',
        boxShadow: isReceiver ? 'shadow-[-1px_2px_0_0_#3]' : 'shadow-[1px_2px_0_0_#88C6F5]',
      }}>
      </Skeleton>
    </Flex>
  )
}