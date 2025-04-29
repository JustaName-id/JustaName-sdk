'use client';

import { Credentials } from '@justverified/plugin';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

export interface ConsoleContext {
  justVerified: Credentials[];
  setJustVerified: (justverified: Credentials[]) => void;
}

export const ConsoleContext = createContext<ConsoleContext>({
  justVerified: [],
  setJustVerified: () => { },
});

export interface ConsoleProviderProps {
  children: ReactNode;
}
export const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const [justVerified, setJustVerified] = useState<Credentials[]>([
    'twitter',
    'telegram',
    'github',
    'discord',
    'email',
  ]);
  return (
    <ConsoleContext.Provider
      value={{
        justVerified,
        setJustVerified,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = () => {
  const context = useContext(ConsoleContext);

  return context;
};
