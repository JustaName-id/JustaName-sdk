'use client';
import { usePrimaryNameBatch } from '@justaname.id/react';
import {
  AddIcon,
  Button,
  Flex,
  Sheet,
  SheetContent,
  SheetTitle,
  SPAN,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@justweb3/ui';
import { Conversation, DecodedMessage } from '@xmtp/browser-sdk';
import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FullConversation, useConversations } from '../../hooks';
import { ChatList } from './ChatList';

export interface InboxSheetProps {
  open?: boolean;
  handleOpen?: (open: boolean) => void;
  handleOpenChat: (
    conversation: FullConversation
  ) => void;
  handleNewChat: () => void;
  onConversationsUpdated: ({
    allowed,
    blocked,
    requested,
  }: {
    allowed: Conversation[];
    blocked: Conversation[];
    requested: Conversation[];
  }) => void;
  allConversations: {
    allowed: Conversation[];
    blocked: Conversation[];
    requested: Conversation[];
  };
  conversationsInfo: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[];
}

export const InboxSheet: React.FC<InboxSheetProps> = ({
  open,
  handleOpen,
  handleOpenChat,
  handleNewChat,
  onConversationsUpdated,
  allConversations,
  conversationsInfo,
}) => {
  const [tab, setTab] = React.useState('Chats');
  const { conversations, conversationsLoading: isLoading } = useConversations();

  const [addresses, setAddresses] = React.useState<string[]>([]);

  const extractedAddresses = useMemo(() => {
    if (conversations.allowed.length === 0 && conversations.blocked.length === 0 && conversations.requested.length === 0) {
      return [];
    }
    return [...conversations.allowed, ...conversations.blocked, ...conversations.requested]
      .map((conversation) => conversation.peerAddress);
  }, [conversations.allowed, conversations.blocked, conversations.requested]);

  useEffect(() => {
    if (extractedAddresses.length > 0 && !isEqual(addresses, extractedAddresses)) {
      setAddresses(extractedAddresses);
    }
  }, [extractedAddresses, addresses]);

  const { allPrimaryNames } = usePrimaryNameBatch({
    addresses,
    enabled: addresses.length > 0,
  });

  const updateConversations = useCallback(() => {
    const shouldUpdate =
      !isEqual(
        conversations.allowed.map(convo => convo.id).sort(),
        allConversations.allowed.map(convo => convo.id).sort()
      ) ||
      !isEqual(
        conversations.blocked.map(convo => convo.id).sort(),
        allConversations.blocked.map(convo => convo.id).sort()
      ) ||
      !isEqual(
        conversations.requested.map(convo => convo.id).sort(),
        allConversations.requested.map(convo => convo.id).sort()
      );

    if (shouldUpdate) {
      onConversationsUpdated({
        allowed: conversations.allowed,
        blocked: conversations.blocked,
        requested: conversations.requested,
      });
    }
  }, [allConversations, conversations, onConversationsUpdated]);

  useEffect(() => {
    updateConversations();
  }, [updateConversations]);

  const allowedChatList = useMemo(() => (
    <ChatList
      conversations={conversations.allowed}
      conversationsInfo={conversationsInfo}
      handleOpenChat={handleOpenChat}
      primaryNames={allPrimaryNames}
      consent="allowed"
    />
  ), [conversations.allowed, conversationsInfo, handleOpenChat, allPrimaryNames]);

  const requestedChatList = useMemo(() => (
    <ChatList
      conversations={conversations.requested}
      handleOpenChat={handleOpenChat}
      conversationsInfo={conversationsInfo}
      primaryNames={allPrimaryNames}
      consent="requested"
    />
  ), [conversations.requested, conversationsInfo, handleOpenChat, allPrimaryNames]);

  const blockedChatList = useMemo(() => (
    <ChatList
      conversations={conversations.blocked}
      handleOpenChat={handleOpenChat}
      blockedList
      conversationsInfo={conversationsInfo}
      primaryNames={allPrimaryNames}
      consent="blocked"
    />
  ), [conversations.blocked, conversationsInfo, handleOpenChat, allPrimaryNames]);

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" overlay={false} aria-describedby={undefined} style={{ width: '100%' }}>
        <SheetTitle>Chats</SheetTitle>
        <Flex
          align="center"
          justify="center"
          style={{
            width: 45,
            height: 45,
            borderRadius: '50%',
            backgroundColor: 'var(--justweb3-primary-color)',
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
        <Flex direction={'column'} gap={'10px'}>
          <Tabs
            defaultValue={'Chats'}
            value={tab}
            onValueChange={(value) => setTab(value)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '0px',
              // overflow: 'hidden',
              maxHeight: 'calc(100vh - 72px - 10px - 28px - 10px)',
              minHeight: 'calc(100vh - 72px - 10px - 28px - 10px)',
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
                <Flex style={{ gap: '5px' }}>
                  Requests
                  {conversationsInfo.filter(info => info.consent === 'requested').length > 0 && (
                    <div
                      style={{
                        // position: 'absolute',
                        // top: -5,
                        // right: 10,
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
                        // marginLeft: 'auto',
                      }}
                    >
                      <SPAN
                        style={{
                          fontSize: '10px',
                          color: 'var(--justweb3-background-color)',
                        }}
                      >
                        {conversationsInfo.filter(info => info.consent === 'requested').length}
                      </SPAN>
                    </div>
                  )}
                </Flex>
              </TabsTrigger>
              <TabsTrigger
                value={'Blocked'}
                style={{ flexBasis: 'calc( 100% / 3)' }}
              >
                Blocked
              </TabsTrigger>
            </TabsList>
            {isLoading ? (
              // {true ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <SPAN style={{ fontSize: '12px' }}>Loading...</SPAN>
              </div>
            ) : (
              <>
                <TabsContent
                  value={'Chats'}
                  style={{
                    overflowY: 'scroll',
                    maxHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                    minHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                  }}
                >
                  {conversations.allowed.length === 0 ?
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        width: '100%',
                      }}
                    >
                      <SPAN style={{ fontSize: '18px', fontWeight: "bold" }}>No conversations yet!</SPAN>
                      <Button
                        onClick={handleNewChat}>
                        New Chat
                      </Button>
                    </div>
                    :
                    allowedChatList
                  }
                </TabsContent>
                <TabsContent
                  value={'Requests'}
                  style={{
                    overflowY: 'scroll',
                    maxHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                    minHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                  }}
                >
                  {requestedChatList}
                </TabsContent>
                <TabsContent
                  value={'Blocked'}
                  style={{
                    overflowY: 'scroll',
                    maxHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                    minHeight:
                      'calc(100vh - 72px - 10px - 28px - 10px - 30px - 10px)',
                  }}
                >
                  {blockedChatList}
                </TabsContent>
              </>
            )}
          </Tabs>

          <Flex
            direction={'column'}
            style={{
              margin: '0 auto',
              textAlign: 'center',
              gap: '5px',
              opacity: '0.5',
            }}
          >
            <SPAN
              style={{
                fontSize: '8px',
                fontWeight: '700',
                color: 'var(--justweb3-text-color)',
              }}
            >
              POWERED BY
            </SPAN>
            <svg
              // width="85"
              height="15"
              viewBox="0 0 85 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_600_92)">
                <path
                  d="M32.2362 9.39735L37.0447 3.22852H33.3144L30.3172 7.36164L27.2768 3.22852H23.374L28.1178 9.5413L23.1152 15.998H26.824L30.0584 11.6387L33.2712 15.998H37.1957L32.2362 9.39735Z"
                  fill="black"
                />
                <path
                  d="M47.524 12.1117H47.4809L44.4433 3.22852H39.3518V16.0185H42.4999V6.60081H42.5861L45.9068 16.0185H48.8609L52.16 6.60081H52.2463V16.0185H55.61V3.22852H50.5859L47.524 12.1117Z"
                  fill="black"
                />
                <path
                  d="M57.8525 3.20801V5.90173H62.5864L62.5748 15.9981H65.9601L65.9667 5.90173H70.6823V3.20801H57.8525Z"
                  fill="black"
                />
                <path
                  d="M79.5662 3.20801H72.8818V15.9981H76.2671V12.0089H79.5016C82.9369 12.0089 85 10.4375 85 7.54676C85 4.69108 82.9329 3.22633 79.5713 3.22633L79.5662 3.20801ZM76.2671 9.35626V5.90173H79.2428C80.6576 5.90173 81.5928 6.35313 81.5928 7.64957C81.5928 8.92846 80.6665 9.33573 79.1781 9.33573L76.2671 9.35626Z"
                  fill="black"
                />
                <path
                  d="M0 9.5C0 4.2533 4.46011 0 9.96195 0C15.4602 0 19.7083 4.17424 19.8376 9.45886C19.8376 11.145 19.2339 12.5638 17.7245 13.9004C16.449 15.0299 14.2745 15.1959 12.679 14.3528C11.5402 13.7264 10.6625 12.3922 9.91881 11.4123L8.5388 13.4275H5.56317L8.36631 9.45871L5.64942 5.55195H8.7113L9.94042 7.5671L11.1479 5.55195H14.2314L11.4282 9.45886C11.4282 9.45886 12.7651 11.4123 13.4982 12.1732C14.2314 12.934 15.5683 12.9546 16.4307 12.132C17.379 11.2277 17.5913 10.5076 17.5952 9.45886C17.6099 5.39955 14.2288 2.13853 9.96195 2.13853C5.69862 2.13853 2.24251 5.43437 2.24251 9.5C2.24251 13.5656 5.69862 16.8615 9.96195 16.8615C10.5517 16.8615 11.1168 16.8142 11.6654 16.6969L12.1398 18.7738C11.3592 18.9407 10.7286 19 9.96195 19C4.46011 19 0 14.7467 0 9.5Z"
                  fill="#FC4F37"
                />
              </g>
              <defs>
                <clipPath id="clip0_600_92">
                  <rect width="85" height="19" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Flex>
        </Flex>
      </SheetContent>
    </Sheet>
  );
};
