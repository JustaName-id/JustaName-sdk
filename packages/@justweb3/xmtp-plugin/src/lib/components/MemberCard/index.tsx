import { useEnsAvatar, usePrimaryName, useRecords } from '@justaname.id/react';
import { Avatar, Button, ComboBox, DeleteIcon, Flex, formatText, P } from '@justweb3/ui';
import { Group, PermissionLevel, SafeGroupMember } from '@xmtp/browser-sdk';
import React from 'react';
export interface MemberCardProps {
    address: string;
    onClick?: () => void;
    selected?: boolean;
    group?: Group;
    member?: SafeGroupMember;
    onRemove?: () => void;
    onAdd?: () => void;
    onRoleChanged?: (role: string) => void;
}


const memberPermissions = [
    {
        label: 'Member',
        value: PermissionLevel.Member,
    },
    {
        label: 'Admin',
        value: PermissionLevel.Admin,
    },
    {
        label: 'Super Admin',
        value: PermissionLevel.SuperAdmin,
    },
];

const MemberCard: React.FC<MemberCardProps> = ({
    address,
    onClick,
    selected,
    group,
    member,
    onRemove,
    onAdd,
    onRoleChanged,
}) => {
    const { primaryName } = usePrimaryName({
        address,
    });
    const { records } = useRecords({
        ens: primaryName || undefined,
    });
    const { sanitizeEnsImage } = useEnsAvatar();

    const onRemoveMember = async () => {
        if (group) {
            await group.removeMembersByIdentifiers([
                {
                    identifier: address,
                    identifierKind: 'Ethereum',
                }
            ])
        }
    }

    return (
        <Flex
            padding='5px'
            justify='space-between'
            style={{
                width: '100%',
            }}
            key={address}
            onClick={() => {
                onClick && onClick();
            }}
        >
            <Avatar
                src={
                    primaryName
                        ? sanitizeEnsImage({
                            name: primaryName,
                            chainId: 1,
                            image: records?.sanitizedRecords?.avatar,
                        })
                        : undefined
                }
            />

            <Flex
                direction={'row'}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <P style={{ fontWeight: '400', fontSize: '10px', lineHeight: '80%' }}>
                    {primaryName || formatText(address, 4)}
                </P>
                {group ?
                    <Flex gap='5px' direction='row' align='center'>
                        <ComboBox
                            data={memberPermissions}
                            showSearch={false}
                            value={member?.permissionLevel}
                            onChange={(value) => {
                                onRoleChanged?.(value as string);
                            }}
                        />
                        <DeleteIcon width={7} height={6} onClick={onRemoveMember} />
                    </Flex>
                    :
                    selected ?
                        <DeleteIcon width={7} height={6} onClick={onRemove} />
                        :
                        <Button variant='secondary' size='sm' onClick={onAdd}>Add</Button>
                }
            </Flex>


        </Flex>
    );
};

const MemberCardMemo = React.memo(MemberCard, (prevProps, nextProps) => {
    if (!prevProps.address || !nextProps.address) {
        return false;
    }
    if (prevProps.group !== nextProps.group) {
        return false;
    }
    if (prevProps.selected !== nextProps.selected) {
        return false;
    }
    if (prevProps.onRemove !== nextProps.onRemove) {
        return false;
    }
    if (prevProps.onAdd !== nextProps.onAdd) {
        return false;
    }
    return true;
});

export { MemberCardMemo as MemberCard };

