'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { type ConsoleStore, createConsoleStore, defaultConsoleState } from '../../store/console.store';

export type ConsoleStoreApi = ReturnType<typeof createConsoleStore>;

export const ConsoleStoreContext = createContext<ConsoleStoreApi | undefined>(
    undefined,
);

export interface ConsoleStoreProviderProps {
    children: ReactNode;
}

export const ConsoleStoreProvider = ({
    children,
}: ConsoleStoreProviderProps) => {
    const storeRef = useRef<ConsoleStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createConsoleStore(defaultConsoleState);
    }

    return (
        <ConsoleStoreContext.Provider value={storeRef.current}>
            {children}
        </ConsoleStoreContext.Provider>
    );
};

export const useConsoleStore = <T,>(
    selector: (store: ConsoleStore) => T,
): T => {
    const consoleStoreContext = useContext(ConsoleStoreContext);

    if (!consoleStoreContext) {
        throw new Error(`useConsoleStore must be used within ConsoleStoreProvider`);
    }

    return useStore(consoleStoreContext, selector);
}; 