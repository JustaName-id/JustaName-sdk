export declare const buildSubnameBySubnameKey: (subname: string) => string[];
export interface UseSubnameOptions {
    subname: string;
}
export declare const useSubname: (props: UseSubnameOptions) => {
    subname: import("packages/@justaname.id/sdk/dist/src").SubnameGetBySubnameResponse | undefined;
    isLoading: boolean;
    refetchSubname: (options?: import("@tanstack/query-core/build/legacy/queryClient-6vLRMq5C").a3 | undefined) => Promise<import("@tanstack/query-core/build/legacy/queryClient-6vLRMq5C").aj<import("packages/@justaname.id/sdk/dist/src").SubnameGetBySubnameResponse | undefined, Error>>;
};
//# sourceMappingURL=useSubname.d.ts.map