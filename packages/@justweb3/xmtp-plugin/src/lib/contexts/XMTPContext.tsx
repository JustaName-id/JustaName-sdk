import { Client } from '@xmtp/browser-sdk';
import React, { createContext, useMemo, useState } from 'react';

export type XMTPContextValue = {
    client?: Client;
    setClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
    env: 'local' | 'production' | 'dev';
};

export const XMTPContext = createContext<XMTPContextValue>({
    setClient: () => { },
    env: 'production',
});

export type XMTPProviderProps = React.PropsWithChildren & {
    client?: Client;
    env: 'local' | 'production' | 'dev';
};

export const XMTPProvider: React.FC<XMTPProviderProps> = ({
    children,
    client: initialClient,
    env,
}) => {
    const [client, setClient] = useState<Client | undefined>(initialClient);
    const value = useMemo(
        () => ({
            client,
            setClient,
            env,
        }),
        [client, env],
    );

    return <XMTPContext.Provider value={value}>{children}</XMTPContext.Provider>;
}; 