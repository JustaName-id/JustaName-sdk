import React from 'react';
import { JustaName } from '@justaname.id/sdk';
export declare const defaultRoutes: {
    claimSubnameRoute: string;
    checkSubnameAvailabilityRoute: string;
    requestChallengeRoute: string;
};
export interface JustaNameContextProps {
    justaname: JustaName | null;
    routes: typeof defaultRoutes;
    backendUrl?: string;
    chainId: 1 | 11155111;
}
interface JustaNameProvider {
    children: React.ReactNode;
    routes?: typeof defaultRoutes;
    chainId?: 1 | 11155111;
    backendUrl?: string;
}
export declare const JustaNameProvider: React.FC<JustaNameProvider>;
export default JustaNameProvider;
export declare const useJustaName: () => JustaNameContextProps;
//# sourceMappingURL=JustaNameProvider.d.ts.map