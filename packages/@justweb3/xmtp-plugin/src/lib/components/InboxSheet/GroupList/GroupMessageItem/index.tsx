import { PrimaryNameRecord } from '@justaname.id/react';
import { Avatar, Button, Flex, P, SPAN } from '@justweb3/ui';
import { ConsentState, DecodedMessage } from '@xmtp/browser-sdk';
import { ContentTypeReaction } from '@xmtp/content-type-reaction';
import { ContentTypeAttachment } from '@xmtp/content-type-remote-attachment';
import { ContentTypeReply } from '@xmtp/content-type-reply';
import React, { useMemo } from 'react';
import { FullGroup, useConversations } from '../../../../hooks';
import { useXMTPContext } from '../../../../hooks/useXMTPContext';
import { formatChatDate } from '../../../../utils/formatChatDate';

export interface GroupMessageItemProps {
  group: FullGroup;
  onClick?: () => void;
  primaryNames: PrimaryNameRecord | undefined;
  conversationInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  };
}

const GroupMessageItem: React.FC<GroupMessageItemProps> = ({
  group,
  onClick,
  primaryNames,
  conversationInfo,
}) => {
  const { refetchConvos } = useConversations();
  const { client } = useXMTPContext();

  // const unreadMessages = useMemo(() => {
  //   if (!lastMessage) return false;
  //   return lastMessage.contentType !== ContentTypeReadReceipt.toString();
  // }, [lastMessage]);

  const allowGroup = async () => {
    await group.updateConsentState(ConsentState.Allowed)
    await refetchConvos();
  };

  const ignoreGroup = async () => {
    await group.updateConsentState(ConsentState.Denied)
    await refetchConvos();
  };


  const lastMessageName = useMemo(() => {
    const lastMessage = conversationInfo?.lastMessage;
    if (!lastMessage) return '';

    const member = group.groupMembers.find(member => member.inboxId === lastMessage.senderInboxId);
    if (member) {
      const address = member.accountIdentifiers.find(identifier => identifier.identifierKind === 'Ethereum')?.identifier ?? '';
      return primaryNames?.[address] ?? address;
    }

    return lastMessage.senderInboxId;
  }, [conversationInfo?.lastMessage, group.groupMembers, primaryNames]);

  const lastContent = useMemo(() => {
    const lastMessage = conversationInfo?.lastMessage;
    if (!lastMessage) return '';

    if (typeof lastMessage.content === 'string') {
      return lastMessage.content;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeAttachment)
    ) {
      return (lastMessage.content as { filename: string }).filename;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeReaction)
    ) {
      return lastMessage.fallback;
    }

    if (
      lastMessage.contentType.sameAs(ContentTypeReply)
    ) {
      return 'replied "' + (lastMessage.content as { content: string }).content + '"';
    }

    return lastMessage.fallback;
  }, [conversationInfo, conversationInfo?.lastMessage]);

  return (
    <Flex
      style={{
        padding: '10px',
        border: '1px solid var(--justweb3-foreground-color-4)',
        borderRadius: '5px',
        cursor: conversationInfo?.consent === 'blocked' ? 'not-allowed' : 'pointer',
      }}
      key={group.id}
      onClick={() => {
        if (conversationInfo?.consent === 'blocked') return;
        onClick && onClick();
      }}
    >
      <Avatar
        src={group.imageUrl}
      />

      <Flex
        direction={'column'}
        style={{
          marginLeft: '10px',
          maxWidth:
            conversationInfo?.consent === 'requested'
              ? 'calc(100% - 132px - 44px)'
              : conversationInfo?.consent === 'blocked'
                ? 'calc(100% - 120px)'
                : 'calc(100% - 50px - 32px - 10px)',
          justifyContent: 'space-between',
        }}
      >
        <P style={{ fontWeight: '700' }}>
          {group.name}
        </P>
        <SPAN
          style={{
            fontSize: '10px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            lineHeight: '12px',
          }}
        >
          {conversationInfo?.lastMessage
            ? conversationInfo?.lastMessage.senderInboxId ===
              client?.inboxId
              ? 'You: '
              : lastMessageName
            : ''}
          {conversationInfo?.lastMessage
            ? lastContent
              ? lastContent
              : 'No preview available'
            : ''}
        </SPAN>
      </Flex>

      <Flex
        direction={'column'}
        gap={'5px'}
        style={{
          marginLeft: 'auto',
          alignContent: 'space-between',
          textAlign: 'end',
        }}
      >
        {conversationInfo?.consent !== 'allowed' ? (
          <Flex gap={'5px'}>
            <Button
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation();
                allowGroup();
              }}
              style={{
                height: '10px',
              }}
            >
              {conversationInfo?.consent === 'requested' ? 'Allow' : 'Unblock'}
            </Button>
            {conversationInfo?.consent === 'requested' && (
              <Button
                variant="destructive-outline"
                onClick={(event) => {
                  event.stopPropagation();
                  ignoreGroup();
                }}
                style={{
                  height: '10px',
                }}
              >
                Ignore
              </Button>
            )}
          </Flex>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              placeContent: 'space-between',
              height: '100%',
            }}
          >
            <SPAN style={{ fontSize: '10px' }}>
              {conversationInfo?.lastMessage?.sentAtNs
                ? formatChatDate(conversationInfo?.lastMessage.sentAtNs)
                : ''}
            </SPAN>
            {!!conversationInfo?.unreadCount &&
              conversationInfo?.unreadCount > 0 && (
                <div
                  style={{
                    background: 'var(--justweb3-primary-color)',
                    padding: '5px',
                    borderRadius: '100px',
                    height: '8px',
                    minWidth: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'content-box',
                    width: 'fit-content',
                    marginLeft: 'auto',
                  }}
                >
                  <SPAN
                    style={{
                      fontSize: '10px',
                      color: 'var(--justweb3-background-color)',
                    }}
                  >
                    {conversationInfo?.unreadCount}
                  </SPAN>
                </div>
              )}
          </div>
        )}
      </Flex>
    </Flex>
  );
};

const GroupMessageItemMemo = React.memo(GroupMessageItem, (prevProps, nextProps) => {
  if (!prevProps.conversationInfo || !nextProps.conversationInfo) {
    return false;
  }
  if (prevProps.conversationInfo?.unreadCount !== nextProps.conversationInfo?.unreadCount) {
    return false;
  }
  if (prevProps.conversationInfo?.consent !== nextProps.conversationInfo?.consent) {
    return false;
  }
  if (prevProps.conversationInfo?.lastMessage?.id !== nextProps.conversationInfo?.lastMessage?.id) {
    return false;
  }
  if (prevProps.conversationInfo?.lastMessage?.sentAtNs !== nextProps.conversationInfo?.lastMessage?.sentAtNs) {
    return false;
  }
  if (prevProps.group.id !== nextProps.group.id) {
    return false;
  }
  if (prevProps.primaryNames !== nextProps.primaryNames) {
    return false;
  }
  return true;
});

export { GroupMessageItemMemo as GroupMessageItem };

