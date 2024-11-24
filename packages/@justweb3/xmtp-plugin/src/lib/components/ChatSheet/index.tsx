import {
  Sheet,
  SheetContent,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@justweb3/ui';
import React, { useEffect, useMemo } from 'react';
import {
  useConsent,
  useConversations,
  useStreamConversations,
} from '@xmtp/react-sdk';
import { ChatList } from '../ChatList';

export interface ChatSheetProps {
  open?: boolean;
  handleOpen?: (open: boolean) => void;
}

export const ChatSheet: React.FC<ChatSheetProps> = ({ open, handleOpen }) => {
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

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" overlay={false} style={{ width: '100%' }}>
        <SheetTitle>Chats</SheetTitle>
        <Tabs
          defaultValue={'Chats'}
          value={tab}
          onValueChange={(value) => setTab(value)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '0px',
            overflow: 'hidden',
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
              style={{ flexBasis: 'calc( 100% / 3)' }}
            >
              Requests
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
              <TabsContent value={'Chats'}>
                <ChatList conversations={allowedConversations} />
              </TabsContent>
              <TabsContent value={'Requests'}>
                <ChatList conversations={requestConversations} />
              </TabsContent>
              <TabsContent value={'Blocked'}>
                <ChatList conversations={blockedConversations} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
