import {
    Button,
    ComboBox,
    Flex,
    Input,
    P
} from '@justweb3/ui';
import { GroupPermissionsOptions, PermissionPolicy, SafeCreateGroupOptions } from '@xmtp/browser-sdk';
import React from 'react';
import { GroupAvatarEditorDialog } from './GroupAvatarSelectorDialog';

interface InfoSectionProps {
    groupDetails: SafeCreateGroupOptions
    setGroupDetails: (groupDetails: SafeCreateGroupOptions) => void;
    onNext: () => void;
}

const permissions = [
    {
        label: 'Default',
        value: GroupPermissionsOptions.Default as number,
    },
    {
        label: 'Admin Only',
        value: GroupPermissionsOptions.AdminOnly as number,
    },
    {
        label: 'Custom Policy',
        value: GroupPermissionsOptions.CustomPolicy as number,
    },
]

const permissionsPolicy = [
    {
        label: 'Allow',
        value: PermissionPolicy.Allow,
    },
    {
        label: 'Deny',
        value: PermissionPolicy.Deny,
    },
    {
        label: 'Admin',
        value: PermissionPolicy.Admin,
    },
    {
        label: 'SuperAdmin',
        value: PermissionPolicy.SuperAdmin,
    },
]

export const InfoSection: React.FC<InfoSectionProps> = ({
    groupDetails,
    setGroupDetails,
    onNext,
}) => {

    return (
        <Flex
            direction="column"
            gap="10px"
            justify='space-between'
            style={{
                paddingTop: '30px',
                height: '100%',
                width: '100%',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
            }}
        >
            <Flex
                direction="column"
                gap="20px"
                style={{
                    padding: '10px 0px',
                }}
            >
                <Flex direction='column' gap='10px'>
                    <P style={{
                        fontSize: '12px',
                        fontWeight: '300',
                        lineHeight: '140%',
                    }}>Group Info</P>
                    <Flex direction='row' gap='5px'>
                        <GroupAvatarEditorDialog
                            onImageChange={(newImage) => setGroupDetails({ ...groupDetails, imageUrlSquare: newImage })}
                            avatar={groupDetails.imageUrlSquare}
                        />
                        <Flex direction='column' gap='5px' style={{
                            flexGrow: 1,
                        }}>
                            <Input
                                value={groupDetails.name}
                                placeholder='Group Name'
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '0.5px solid var(--justweb3-foreground-color-4)',
                                    padding: '10px 8px',
                                    fontSize: '10px',
                                    fontWeight: '400',
                                    height: '22px',
                                    lineHeight: '10px',
                                }}
                                onChange={(e) => setGroupDetails({ ...groupDetails, name: e.target.value })}
                            />
                            <Input
                                value={groupDetails.description}
                                placeholder='Group Description'
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '0.5px solid var(--justweb3-foreground-color-4)',
                                    padding: '10px 8px',
                                    fontSize: '10px',
                                    fontWeight: '400',
                                    lineHeight: '10px',
                                    height: '49px',
                                }}
                                onChange={(e) => setGroupDetails({ ...groupDetails, description: e.target.value })}
                            />
                        </Flex>
                    </Flex>
                    <Flex direction='column' gap='10px'>
                        <Flex direction='row' gap='10px' justify='space-between' align='center'>
                            <P style={{
                                fontSize: '10px',
                                fontWeight: '300',
                                lineHeight: '14px',
                            }}>Permissions</P>
                            <ComboBox
                                data={permissions}
                                showSearch={false}
                                value={groupDetails.permissions}
                                onChange={(value) => setGroupDetails({ ...groupDetails, permissions: +value as GroupPermissionsOptions })}
                            />
                        </Flex>
                        <Flex direction='column' gap='5px' >
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Add Members</P>
                                <ComboBox
                                    data={permissionsPolicy.filter((policy) => policy.value !== PermissionPolicy.Allow)}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.addMemberPolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: +value as PermissionPolicy,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Remove Members</P>
                                <ComboBox
                                    data={permissionsPolicy.filter((policy) => policy.value !== PermissionPolicy.Allow)}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.removeMemberPolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: +value as PermissionPolicy,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Add Admins</P>
                                <ComboBox
                                    data={permissionsPolicy.filter((policy) => policy.value !== PermissionPolicy.Allow)}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.addAdminPolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: +value as PermissionPolicy,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Remove Admins</P>
                                <ComboBox
                                    data={permissionsPolicy.filter((policy) => policy.value !== PermissionPolicy.Allow)}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.removeAdminPolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: +value as PermissionPolicy,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Update Group Name</P>
                                <ComboBox
                                    data={permissionsPolicy}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.updateGroupNamePolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: +value as PermissionPolicy,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Update Group Description</P>
                                <ComboBox
                                    data={permissionsPolicy}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.updateGroupDescriptionPolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: +value as PermissionPolicy,
                                                updateGroupImageUrlSquarePolicy: existingPolicySet?.updateGroupImageUrlSquarePolicy ?? PermissionPolicy.Admin,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                            <Flex style={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'var(--justweb3-foreground-color-4)',
                            }} />
                            <Flex direction='row' gap='10px' justify='space-between' align='center'>
                                <P style={{
                                    fontSize: '9px',
                                    fontWeight: '300',
                                    lineHeight: '14px',
                                }}>Update Group Image</P>
                                <ComboBox
                                    data={permissionsPolicy}
                                    showSearch={false}
                                    value={groupDetails.customPermissionPolicySet?.updateGroupImageUrlSquarePolicy}
                                    onChange={(value) => {
                                        const existingPolicySet = groupDetails.customPermissionPolicySet;
                                        setGroupDetails({
                                            ...groupDetails,
                                            customPermissionPolicySet: {
                                                ...existingPolicySet,
                                                addMemberPolicy: existingPolicySet?.addMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                addAdminPolicy: existingPolicySet?.addAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeAdminPolicy: existingPolicySet?.removeAdminPolicy ?? PermissionPolicy.SuperAdmin,
                                                removeMemberPolicy: existingPolicySet?.removeMemberPolicy ?? PermissionPolicy.SuperAdmin,
                                                updateGroupDescriptionPolicy: existingPolicySet?.updateGroupDescriptionPolicy ?? PermissionPolicy.Admin,
                                                updateGroupImageUrlSquarePolicy: +value as PermissionPolicy,
                                                updateGroupNamePolicy: existingPolicySet?.updateGroupNamePolicy ?? PermissionPolicy.Admin,
                                                updateMessageDisappearingPolicy: existingPolicySet?.updateMessageDisappearingPolicy ?? PermissionPolicy.Admin,
                                            }
                                        });
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justify='center' align='center' style={{ padding: "12px 14px" }}>
                <Button
                    variant='secondary'
                    style={{
                        border: 'none'
                    }}
                    onClick={onNext}
                >Next</Button>
            </Flex>
        </Flex>
    );
};

export default InfoSection;