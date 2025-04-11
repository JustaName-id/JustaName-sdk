import { PrimaryNameRecord } from '@justaname.id/react';
import { Flex } from '@justweb3/ui';
import { DecodedMessage, Group } from '@xmtp/browser-sdk';
import React, { useEffect, useMemo, useState } from 'react';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
import { GroupMessageItem } from './GroupMessageItem';
import { FullGroup } from '../../../hooks';

export interface GroupListProps {
  groups: FullGroup[];
  handleOpenGroup: (
    group: FullGroup
  ) => void;
  primaryNames: PrimaryNameRecord | undefined;
  consent: 'allowed' | 'blocked' | 'requested';
  conversationsInfo?: {
    conversationId: string;
    unreadCount: number;
    consent: 'allowed' | 'blocked' | 'requested';
    lastMessage: DecodedMessage;
  }[];
}

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  handleOpenGroup,
  primaryNames,
  conversationsInfo,
  consent,
}) => {
  const { client } = useXMTPContext();

  const [missingGroups, setMissingGroups] = useState<Record<string, Group>>({});

  useEffect(() => {
    const fetchMissingGroups = async () => {
      if (!conversationsInfo || !client) return;
      const consentedConvsersationsInfo = conversationsInfo.filter(info => consent === info.consent);

      const missingIds = consentedConvsersationsInfo.filter(info => !groups.find(c => c.id === info.conversationId)).map(info => info.conversationId);

      const newGroups: Record<string, Group> = {};
      for (const id of missingIds) {
        const group = await client.conversations.getConversationById(id);
        if (group) newGroups[id] = group as unknown as Group;
      }
      setMissingGroups(prev => ({ ...prev, ...newGroups }));
    };

    fetchMissingGroups();
  }, [conversationsInfo, groups, client]);

  const sortedGroups = useMemo(() => {
    if (!conversationsInfo || conversationsInfo.length === 0) {
      return [];
    }

    return [...conversationsInfo]
      .sort((a, b) => {
        const aTime = a.lastMessage?.sentAtNs ? Number(a.lastMessage.sentAtNs) : 0;
        const bTime = b.lastMessage?.sentAtNs ? Number(b.lastMessage.sentAtNs) : 0;
        return bTime - aTime;
      })
      .map((convInfo) => {
        const group = groups.find(
          (item) => item.id === convInfo.conversationId
        ) || missingGroups[convInfo.conversationId];

        if (group) {
          return { group, convInfo };
        }
        return null;
      })
      .filter((item): item is { group: FullGroup; convInfo: typeof conversationsInfo[0] } =>
        item !== null
      );
  }, [conversationsInfo, groups]);

  return (
    <Flex direction={'column'} gap={'10px'}>
      {sortedGroups.map(({ group, convInfo }) => (
        <GroupMessageItem
          key={group.id}
          primaryNames={primaryNames}
          group={group}
          conversationInfo={convInfo}
          onClick={() => handleOpenGroup(group)}
        />
      ))}
    </Flex>
  );
};
