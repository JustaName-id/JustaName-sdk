import { SubnameClaimResponse } from '@justaname.id/sdk';
export interface BaseClaimSubnameRequest {
    username: string;
}
export declare const useClaimSubname: <T = any>() => {
    claimSubname: (params: T & BaseClaimSubnameRequest) => Promise<SubnameClaimResponse>;
    claimSubnamePending: boolean;
};
//# sourceMappingURL=useClaimSubname.d.ts.map