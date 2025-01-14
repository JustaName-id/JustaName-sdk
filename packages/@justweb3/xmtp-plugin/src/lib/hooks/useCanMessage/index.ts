import { useMountedAccount } from '@justaname.id/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/browser-sdk';

const canMessageAddress = async (peerAddress?: `0x${string}`) => {
    if(!peerAddress) return false;
    const response = await Client.canMessage([peerAddress]);
    return response.get(peerAddress);
}

export const useCanMessage = (peerAddress?: `0x${string}`) => {
    const {address} = useMountedAccount();

    const query = useQuery({
        queryKey: ['CAN_MESSAGE', address, peerAddress],
        queryFn: () => canMessageAddress(peerAddress),
        enabled: !!address && !!peerAddress,
    })

    const { mutateAsync: canMessageFn, isPending: canMessageLoading } = useMutation({
        mutationFn: (peerAddress: `0x${string}`) => canMessageAddress(peerAddress),
      });

    return {
        canMessage: query.data,
        canMessageLoading: query.isLoading || canMessageLoading,
        canMessageFn,
    }
}