export declare const useMountedAccount: () => {
    isConnected: boolean;
    address: undefined;
    addresses: undefined;
    chain: undefined;
    chainId: undefined;
    connector: undefined;
    isReconnecting: false;
    isConnecting: false;
    isDisconnected: true;
    status: "disconnected";
} | {
    isConnected: boolean;
    address: `0x${string}`;
    addresses: readonly [`0x${string}`, ...`0x${string}`[]];
    chain: import("viem").Chain | undefined;
    chainId: number;
    connector: import("wagmi").Connector;
    isConnecting: false;
    isDisconnected: false;
    isReconnecting: false;
    status: "connected";
} | {
    isConnected: boolean;
    address: `0x${string}` | undefined;
    addresses: readonly `0x${string}`[] | undefined;
    chain: import("viem").Chain | undefined;
    chainId: number | undefined;
    connector: import("wagmi").Connector | undefined;
    isConnecting: false;
    isDisconnected: false;
    isReconnecting: true;
    status: "reconnecting";
} | {
    isConnected: boolean;
    address: `0x${string}` | undefined;
    addresses: readonly `0x${string}`[] | undefined;
    chain: import("viem").Chain | undefined;
    chainId: number | undefined;
    connector: import("wagmi").Connector | undefined;
    isReconnecting: false;
    isConnecting: true;
    isDisconnected: false;
    status: "connecting";
};
//# sourceMappingURL=useMountedAccount.d.ts.map