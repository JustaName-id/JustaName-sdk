import {
    Flex,
    SPAN,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@justweb3/ui';
import React, { useMemo } from 'react';
import { useConversations } from '../../../hooks/useConversations';
import { MemberCard } from '../../MemberCard';

interface ContactsSectionProps {
    members: string[];
    setMembers: (members: string[]) => void;
}


export const ContactsSection: React.FC<ContactsSectionProps> = ({
    members,
    setMembers,
}) => {
    const [tab, setTab] = React.useState('Chats');

    const { conversations, conversationsLoading: isLoading } = useConversations();
    const allowedMembers = useMemo(() => {
        return conversations.allowed.map(conversation => conversation.peerAddress);
    }, [conversations.allowed]);




    return (
        <Tabs
            defaultValue={'Chats'}
            value={tab}
            onValueChange={(value) => setTab(value)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '0px',
                maxHeight: 'calc(100vh - 16px - 20px - 10px)',
                minHeight: 'calc(100vh - 16px - 20px - 10px)',
                flex: '1',
            }}
        >
            <TabsList>
                <TabsTrigger
                    value={'Chats'}
                    style={{ flexBasis: 'calc( 100% / 3)' }}
                >
                    chats
                </TabsTrigger>
                {/* <TabsTrigger
                    value={'efp-followers'}
                    style={{ flexBasis: 'calc( 100% / 3)' }}
                >
                    EFP FOLLOWERS
                </TabsTrigger>
                <TabsTrigger
                    value={'efp-following'}
                    style={{ flexBasis: 'calc( 100% / 3)' }}
                >
                    EFP FOLLOWING
                </TabsTrigger> */}
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
                                'calc(100vh - 16px - 20px - 10px)',
                            minHeight:
                                'calc(100vh - 16px - 20px - 10px)',
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
                                <SPAN style={{ fontSize: '18px', fontWeight: "bold" }}>No chats yet!</SPAN>
                            </div>
                            :
                            <Flex direction="column" gap="20px">
                                {allowedMembers.map((member) => (
                                    <MemberCard
                                        key={member}
                                        address={member}
                                        selected={members.includes(member)}
                                        onRemove={() => setMembers(members.filter(m => m !== member))}
                                    />
                                ))}
                            </Flex>
                        }
                    </TabsContent>
                    {/* <TabsContent
                        value={'efp-followers'}
                        style={{
                            overflowY: 'scroll',
                            maxHeight:
                                'calc(100vh - 16px - 20px - 10px)',
                            minHeight:
                                'calc(100vh - 16px - 20px - 10px)',
                        }}
                    >
                        
                    </TabsContent>
                    <TabsContent
                        value={'efp-following'}
                        style={{
                            overflowY: 'scroll',
                            maxHeight:
                                'calc(100vh - 16px - 20px - 10px)',
                            minHeight:
                                'calc(100vh - 16px - 20px - 10px)',
                        }}
                    >
                    </TabsContent> */}
                </>
            )}
        </Tabs>
    );
};

export default ContactsSection;