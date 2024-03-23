export declare const buildAccountSubnamesKey: (address: string | undefined) => (string | undefined)[];
export interface UseConnectedWalletSubnamesOptions {
    ensDomain?: string;
}
export declare const useAccountSubnames: (props?: UseConnectedWalletSubnamesOptions) => {
    subnames: import("packages/@justaname.id/sdk/dist/src").SubnameGetAllByAddressResponse[];
    isLoading: boolean;
    refetchSubnames: (options?: import("@tanstack/query-core/build/legacy/queryClient-6vLRMq5C").a3 | undefined) => Promise<import("@tanstack/query-core/build/legacy/queryClient-6vLRMq5C").aj<import("packages/@justaname.id/sdk/dist/src").SubnameGetAllByAddressResponse[] | undefined, Error>>;
};
//# sourceMappingURL=useAccountSubnames.d.ts.map