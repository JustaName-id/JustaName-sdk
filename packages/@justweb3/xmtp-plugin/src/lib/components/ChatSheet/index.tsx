import {
  AddIcon,
  Flex,
  Sheet,
  SheetContent,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@justweb3/ui';
import {
  CachedConversation,
  ContentTypeMetadata,
  useConsent,
  useConversations,
  useStreamAllMessages,
  useStreamConversations,
} from '@xmtp/react-sdk';
import React, { useEffect, useMemo } from 'react';
import { ChatList } from '../ChatList';

export interface ChatSheetProps {
  open?: boolean;
  handleOpen?: (open: boolean) => void;
  handleOpenChat: (
    conversation: CachedConversation<ContentTypeMetadata>
  ) => void;
  handleNewChat: () => void;
}

export const ChatSheet: React.FC<ChatSheetProps> = ({
  open,
  handleOpen,
  handleOpenChat,
  handleNewChat,
}) => {
  const [tab, setTab] = React.useState('Chats');
  const { conversations, isLoading } = useConversations();
  const [isConsentListLoading, setIsConsentListLoading] = React.useState(true);
  const { loadConsentList, entries } = useConsent();

  const allowedConversations = useMemo(() => {
    return conversations.filter(
      (convo) =>
        entries &&
        entries[convo.peerAddress] &&
        entries[convo.peerAddress]?.permissionType === 'allowed'
    );
  }, [conversations, entries]);

  const blockedConversations = useMemo(() => {
    return conversations.filter(
      (convo) =>
        entries &&
        entries[convo.peerAddress] &&
        entries[convo.peerAddress]?.permissionType === 'denied'
    );
  }, [conversations, entries]);

  const requestConversations = useMemo(() => {
    return conversations.filter((convo) => {
      if (!entries[convo.peerAddress]) return true;
      return entries[convo.peerAddress]?.permissionType === 'unknown';
    });
  }, [conversations, entries]);

  useEffect(() => {
    loadConsentList().then(() => {
      setIsConsentListLoading(false);
    });
  }, [loadConsentList]);

  useStreamConversations();
  useStreamAllMessages();

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" overlay={false} style={{ width: '100%' }}>
        <SheetTitle>Chats</SheetTitle>
        <Flex
          align="center"
          justify="center"
          style={{
            width: 45,
            height: 45,
            borderRadius: '50%',
            backgroundColor: 'var(--justweb3-primary-color',
            cursor: 'pointer',
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            zIndex: 100,
          }}
        >
          <AddIcon
            onClick={handleNewChat}
            fill={'var(--justweb3-background-color'}
            width={35}
            height={35}
          />
        </Flex>
        <Tabs
          defaultValue={'Chats'}
          value={tab}
          onValueChange={(value) => setTab(value)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '0px',
            overflow: 'hidden',
            marginTop: '10px',
            flex: '1',
          }}
        >
          <TabsList>
            <TabsTrigger
              value={'Chats'}
              style={{ flexBasis: 'calc( 100% / 3)' }}
            >
              Chats
            </TabsTrigger>
            <TabsTrigger
              value={'Requests'}
              style={{ flexBasis: 'calc( 100% / 3)', position: 'relative' }}
            >
              Requests
              {requestConversations.length > 0 && (
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    color: 'var(--justweb3-background-color)',
                    background: 'var(--justweb3-primary-color)',
                    width: 17,
                    height: 17,
                    borderRadius: '50%',
                    lineHeight: 0.5,
                    fontSize: '10px',
                  }}
                >
                  {requestConversations.length}
                </Flex>
              )}
            </TabsTrigger>
            <TabsTrigger
              value={'Blocked'}
              style={{ flexBasis: 'calc( 100% / 3)' }}
            >
              Blocked
            </TabsTrigger>
          </TabsList>
          {isLoading || isConsentListLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <TabsContent value={'Chats'} style={{ overflowY: 'scroll' }}>
                <ChatList
                  conversations={allowedConversations}
                  handleOpenChat={handleOpenChat}
                />
              </TabsContent>
              <TabsContent value={'Requests'} style={{ overflowY: 'scroll' }}>
                <ChatList
                  conversations={requestConversations}
                  handleOpenChat={handleOpenChat}
                />
              </TabsContent>
              <TabsContent value={'Blocked'} style={{ overflowY: 'scroll' }}>
                <ChatList
                  conversations={blockedConversations}
                  handleOpenChat={handleOpenChat}
                  blockedList
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
