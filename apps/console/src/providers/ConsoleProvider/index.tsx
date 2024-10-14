import { Credentials } from '@justverified/plugin';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

export interface ConsoleContext {
  justVerified: Credentials[] | undefined;
  setJustVerified: (justverified: Credentials[] | undefined) => void;
}
export const ConsoleContext = createContext<ConsoleContext>({
  justVerified: undefined,
  setJustVerified: () => {},
});

export interface ConsoleProviderProps {
  children: ReactNode;
}
export const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const [justVerified, setJustVerified] = useState<Credentials[] | undefined>(
    undefined
  );
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
