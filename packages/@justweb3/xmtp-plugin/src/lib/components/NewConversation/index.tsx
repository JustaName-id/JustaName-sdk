import { CachedConversation, toCachedConversation, useCanMessage, useClient, useConsent, useConversation, useStartConversation } from '@xmtp/react-sdk';
import React, { useEffect, useMemo } from 'react';
import MessageTextField from '../MessageTextField';
import { useAddressResolutionName, useDebounced, useIdentityResolution } from '../../hooks';
import { useMountedAccount, } from '@justaname.id/react';

import { ArrowIcon, Flex, Input, LoadingSpinner } from '@justweb3/ui';

const CancelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" height="24" className="text-red-600 cursor-pointer" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

interface NewConversationProps {
    onChatStarted: (conversation: CachedConversation) => void;
    onBack: () => void;
    selectedAddress?: string
}

const NewConversation: React.FC<NewConversationProps> = ({
    onChatStarted,
    onBack,
    selectedAddress
}) => {
    // States
    const [newAddress, setNewAddress] = React.useState<string>(selectedAddress ?? "");
    const [canMessage, setCanMessage] = React.useState<boolean>(false);
    //Queries
    const { client } = useClient();
    const { startConversation } = useStartConversation()
    const { getCachedByPeerAddress } = useConversation();
    const { refreshConsentList, allow } = useConsent();
    const { address } = useMountedAccount();
    const { canMessage: xmtpCanMessage, isLoading } = useCanMessage();
    const {
        value: debouncedAddress,
    } = useDebounced<string>(newAddress, 500);

    // TODO: change to regex
    const isAddressName = useMemo(() => {
        return !debouncedAddress.startsWith("0x") && !debouncedAddress.startsWith("0X") && debouncedAddress.length > 0;
    }, [debouncedAddress])

    const { name, isAddressResolving } = useAddressResolutionName(debouncedAddress, !isAddressName);

    const { address: resolvedAddress, isIdentityResolving } = useIdentityResolution(debouncedAddress, isAddressName);


    const handleCanMessage = async () => {
        if (!client) return;
        try {
            if (isAddressName && !!resolvedAddress) {
                const res = await xmtpCanMessage(resolvedAddress);
                setCanMessage(res)
            } else {
                if (debouncedAddress.length == 42) {
                    const res = await xmtpCanMessage(debouncedAddress);
                    setCanMessage(res)
                }
            }
        } catch (e) {
            console.log("error", e)
            setCanMessage(false)
        }
    }



    const handleNewConversation = async (message: string) => {
        if (!client) return;
        const peerAddress = (isAddressName && !!resolvedAddress) ? resolvedAddress : debouncedAddress;
        try {
            const conv = await startConversation(peerAddress, message ?? {})
            if (!conv.cachedConversation) {
                if (!conv.conversation) { return }
                else {
                    const cachedConvo = toCachedConversation(conv.conversation, address ?? '');
                    await allow([conv.conversation.peerAddress]);
                    await refreshConsentList();
                    onChatStarted(cachedConvo)
                }
            } else {
                await allow([conv.cachedConversation.peerAddress]);
                await refreshConsentList();
                onChatStarted(conv.cachedConversation)
            }
        } catch (error) {
            const e = error as Error;
            console.log('error creating chat', e)
        }
    }

    const checkIfConversationExists = async (peerAddress: string) => {
        const convoExists = await getCachedByPeerAddress(peerAddress);
        if (convoExists) {
            onChatStarted(convoExists)
        }
    }

    useEffect(() => {
        if (!isLoading && !isIdentityResolving && debouncedAddress.length > 0) {
            handleCanMessage();
        } else if (canMessage && debouncedAddress.length === 0) {
            setCanMessage(false);
        }
    }, [debouncedAddress, isLoading, isIdentityResolving]);



    useEffect(() => {
        if (canMessage) {
            checkIfConversationExists((isAddressName && !!resolvedAddress) ? resolvedAddress : debouncedAddress);
        }
    }, [canMessage, resolvedAddress, debouncedAddress])

    const isSearchLoading = useMemo(() => {
        return ((isAddressName && isIdentityResolving) && debouncedAddress.length > 4) || isLoading;
    }, [isLoading, debouncedAddress, resolvedAddress, isAddressName])

    useEffect(() => {

        if (!isAddressResolving && !isIdentityResolving) {
            return
        }

        if (name) {
            setNewAddress(name)
            return
        }
    }, [name, isAddressResolving, isIdentityResolving])

    return (
        <Flex direction='column' gap='20px' style={{
            height: '100%',
            width: '100%'
        }} >
            <Flex direction='row' align='center' gap='10px' justify='space-between' >
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        cursor: 'pointer',
                        backgroundColor: 'var(--justweb3-foreground-color-4)',
                    }}
                    onClick={onBack}
                >
                    <ArrowIcon
                        height={15}
                        width={15}
                        style={{
                            transform: 'rotate(180deg) translateX(1px)',
                        }}
                    />
                </Flex>
                <Input
                    value={newAddress}
                    className='flex-1'
                    left={
                        <p className='font-poppins text-primary text-base font-bold leading-[150%]'>To</p>
                    }
                    right={
                        isSearchLoading ? <LoadingSpinner color={'var(--justweb3-primary-color)'} />
                            :
                            <CancelIcon width={24} height={24} className={`${canMessage ? "text-green-600" : "text-red-600"} cursor-pointer`} onClick={() => {
                                setNewAddress("")
                            }} />
                    }
                    placeholder={'Subname, Wallet...'}
                    onChange={(e) => setNewAddress(e.target.value)}

                />
            </Flex>
            <Flex style={{
                marginTop: 'auto'
            }}>
                <MessageTextField newConvo disabled={!canMessage} onNewConvo={handleNewConversation} />
            </Flex>
        </Flex>
    );
};

export default NewConversation;
