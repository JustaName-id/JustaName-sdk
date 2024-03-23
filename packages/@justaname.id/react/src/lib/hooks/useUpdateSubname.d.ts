import { SubnameClaimResponse } from '@justaname.id/sdk';
export interface BaseClaimSubnameRequest {
    username: string;
}
export declare const useUpdateSubname: <T = any>() => {
    claimSubname: (params: T & BaseClaimSubnameRequest) => Promise<SubnameClaimResponse>;
    claimSubnamePending: boolean;
};
//# sourceMappingURL=useUpdateSubname.d.ts.map