import { usePrimaryName, useRecords } from '@justaname.id/react';
import {
    Button,
    Flex,
    Input,
    MemberContactsIcon
} from '@justweb3/ui';
import { useDebounce } from '@justweb3/widget';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useCanMessage } from '../../../hooks/useCanMessage';
import { useClientAddress } from '../../../hooks/useClientAddress';
import { useXMTPContext } from '../../../hooks/useXMTPContext';
import { MemberCard } from '../../MemberCard';

interface MembersSectionProps {
    members: string[];
    setMembers: (members: string[]) => void;
    onNext: () => void;
    onContactsClicked: () => void;
}


export const MembersSection: React.FC<MembersSectionProps> = ({
    members,
    setMembers,
    onNext,
    onContactsClicked,
}) => {

    const [newAddress, setNewAddress] = React.useState<string>('');
    const [canMessage, setCanMessage] = React.useState<boolean>(false);
    const [isVerifying, setIsVerifying] = React.useState<boolean>(false);
    //Queries
    const { client } = useXMTPContext();
    const { clientAddress } = useClientAddress();
    const { canMessageFn: xmtpCanMessage, canMessageLoading } = useCanMessage();
    const {
        debouncedValue: debouncedAddress,
        isDebouncing: isDebouncingAddress,
    } = useDebounce<string>(newAddress, 500);


    const isAddressName = useMemo(() => {
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        return (
            !ethAddressRegex.test(debouncedAddress) && debouncedAddress.length > 0
        );
    }, [debouncedAddress]);

    const { records, isRecordsLoading, isRecordsFetching } = useRecords({
        ens: debouncedAddress,
        enabled: isAddressName,
    });

    const {
        primaryName: name,
        isPrimaryNameLoading,
        isPrimaryNameFetching,
    } = usePrimaryName({
        address: debouncedAddress as `0x${string}`,
        enabled: !isAddressName,
    });


    const resolvedAddress = useMemo(() => {
        const ethAddress = records?.sanitizedRecords?.ethAddress?.value;
        if (ethAddress && ethAddress !== clientAddress) {
            return ethAddress;
        }
        return undefined;
    }, [clientAddress, records?.sanitizedRecords?.ethAddress?.value]);

    const handleCanMessage = useCallback(async () => {
        if (!client) return;
        setIsVerifying(true);
        try {
            if (isAddressName) {
                if (resolvedAddress) {
                    const res = await xmtpCanMessage(resolvedAddress as `0x${string}`);
                    setCanMessage(!!res);
                } else {
                    setIsVerifying(false);
                    return;
                }
            } else if (
                debouncedAddress.length === 42 &&
                clientAddress !== debouncedAddress
            ) {
                const res = await xmtpCanMessage(debouncedAddress as `0x${string}`);
                setCanMessage(!!res);
            } else {
                setCanMessage(false);
            }
        } catch (e) {
            console.log('error', e);
            setCanMessage(false);
        } finally {
            setIsVerifying(false);
        }
    }, [client, isAddressName, resolvedAddress, debouncedAddress, xmtpCanMessage, clientAddress]);


    useEffect(() => {
        if (name && !isPrimaryNameLoading && !isPrimaryNameFetching) {
            setNewAddress(name);
        }
    }, [name, isPrimaryNameLoading, isPrimaryNameFetching]);

    const shouldCheckCanMessage = useMemo(() => {
        if (debouncedAddress.length === 0) return false;

        if (canMessage &&
            ((isAddressName && resolvedAddress) ||
                (!isAddressName && debouncedAddress.length === 42))) {
            return false;
        }

        if (isAddressName) {
            return !isRecordsLoading && resolvedAddress !== undefined;
        } else {
            return !canMessageLoading && !isPrimaryNameLoading;
        }
    }, [
        debouncedAddress,
        isAddressName,
        isRecordsLoading,
        resolvedAddress,
        canMessageLoading,
        isPrimaryNameLoading,
        canMessage
    ]);

    useEffect(() => {
        if (debouncedAddress.length === 0) {
            setCanMessage(false);
            return;
        }

        if (shouldCheckCanMessage) {
            handleCanMessage();
        }
    }, [shouldCheckCanMessage, handleCanMessage]);


    const isSearchLoading = useMemo(() => {
        return isDebouncingAddress || isRecordsFetching || isPrimaryNameFetching || isVerifying;
    }, [isDebouncingAddress, isRecordsFetching, isPrimaryNameFetching, isVerifying]);

    const addMemberHandler = useCallback(() => {
        if (!client || !canMessage) return;
        const peerAddress =
            isAddressName && !!resolvedAddress ? resolvedAddress : debouncedAddress;
        setMembers([...members, peerAddress]);
    }, [debouncedAddress, members, setMembers]);

    return (
        <Flex
            direction="column"
            gap="10px"
            justify='space-between'
            style={{
                paddingTop: '10px',
                height: '100%',
                width: '100%',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
            }}
        >
            <Flex direction='column' gap='10px' style={{ flex: 1 }}>
                <Input
                    left={<MemberContactsIcon onClick={onContactsClicked} style={{ cursor: 'pointer' }} width={12} height={12} />}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    right={<Button
                        disabled={isSearchLoading || newAddress.length === 0 || !canMessage}
                        variant='secondary'
                        style={{ border: 'none' }}
                        onClick={addMemberHandler}>Add Member
                    </Button>}
                />
                <Flex direction='column' gap='5px' style={{ flex: 1 }}>
                    {members.map(member => (
                        <Flex key={member} direction='column' gap='5px'>
                            <MemberCard
                                address={member}
                                selected
                                onRemove={() => setMembers(members.filter(m => m !== member))}
                            />
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex justify='center' align='center' style={{ padding: "12px 14px" }}>
                <Button
                    variant='secondary'
                    style={{
                        border: 'none'
                    }}
                    onClick={onNext}
                >Create Group</Button>
            </Flex>
        </Flex>
    );
};

export default MembersSection;