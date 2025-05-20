import { Credentials } from '@justverified/plugin';
import { createStore } from 'zustand/vanilla';

export interface ConsoleStateData {
  justVerified: Credentials[];
}

export interface ConsoleActions {
  setJustVerified: (justVerified: Credentials[]) => void;
}

export type ConsoleStore = ConsoleStateData & ConsoleActions;

export const defaultConsoleState: ConsoleStateData = {
  justVerified: [],
};

export const createConsoleStore = (
  initState: ConsoleStateData = defaultConsoleState
) => {
  return createStore<ConsoleStore>()((set) => ({
    ...initState,
    setJustVerified: (justVerified: Credentials[]) => set({ justVerified }),
  }));
};
