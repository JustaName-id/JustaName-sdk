import {
    ArrowIcon,
    Flex,
    P,
    Sheet,
    SheetContent,
    SheetTitle
} from '@justweb3/ui';
import { ConsentState, GroupPermissionsOptions, IdentifierKind, SafeCreateGroupOptions } from '@xmtp/browser-sdk';
import React from 'react';
import { FullGroup } from '../../hooks';
import { useXMTPContext } from '../../hooks/useXMTPContext';
import { InfoSection } from './Info';
import { MembersSection } from './Members';
import { ContactsSection } from './Contacts';

interface NewGroupProps {
    onGroupStarted: (group: FullGroup) => void;
    open: boolean;
    onClose: () => void;
}

export const NewGroup: React.FC<NewGroupProps> = ({
    onGroupStarted,
    open,
    onClose,
}) => {
    const [groupDetails, setGroupDetails] = React.useState<SafeCreateGroupOptions>({
        permissions: GroupPermissionsOptions.Default,
    });

    const [addedMembers, setAddedMembers] = React.useState<string[]>([]);
    const [section, setSection] = React.useState<'details' | 'members' | 'contacts'>('details');
    const { client } = useXMTPContext();

    const onCreateGroup = async () => {
        try {
            const identifiers = addedMembers.map(member => ({
                identifier: member,
                identifierKind: 'Ethereum' as IdentifierKind
            }));
            const newGroup = await client?.conversations.newGroupWithIdentifiers(identifiers, groupDetails);
            newGroup?.updateConsentState(ConsentState.Allowed);
            // newGroup?.updateImageUrl
            onGroupStarted(newGroup as FullGroup);
        } catch (error) {
            const e = error as Error;
            console.log('error creating group', e);
        }
    }

    const backBtnHandler = () => {
        switch (section) {
            case 'details':
                onClose();
                break;
            case 'members':
                setSection('details');
                break;
            case 'contacts':
                setSection('members');
                break;
        }
    }
    return (
        <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
            <SheetContent
                side="right"
                overlay={false}
                hideClose
                style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
            >
                <SheetTitle>
                    <Flex
                        direction="row"
                        align="center"
                        gap="10px"
                        justify="space-between"
                        style={{
                            padding: '10px',
                        }}
                    >
                        <Flex
                            align="center"
                            justify="center"
                            style={{
                                borderRadius: '50%',
                                width: 30,
                                height: 30,
                                cursor: 'pointer',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }}
                            onClick={backBtnHandler}
                        >
                            <ArrowIcon
                                height={21}
                                fill='var(--justweb3-foreground-color-1)'
                                width={21}
                                style={{
                                    transform: 'rotate(180deg) translateX(1px)',
                                }}
                            />
                        </Flex>
                        <P>{section === 'details' ? 'New Group' : section === 'members' ? 'Add Members' : 'Contacts'}</P>
                    </Flex>
                </SheetTitle>

                {section === 'details' && (
                    <InfoSection
                        groupDetails={groupDetails}
                        setGroupDetails={setGroupDetails}
                        onNext={() => setSection('members')}
                    />
                )}
                {section === 'members' && (
                    <MembersSection
                        members={addedMembers}
                        setMembers={setAddedMembers}
                        onNext={onCreateGroup}
                        onContactsClicked={() => setSection('contacts')}
                    />
                )}
                {section === 'contacts' && (
                    <ContactsSection
                        members={addedMembers}
                        setMembers={setAddedMembers}
                    />
                )}


            </SheetContent>
        </Sheet>
    );
};

export default NewGroup;