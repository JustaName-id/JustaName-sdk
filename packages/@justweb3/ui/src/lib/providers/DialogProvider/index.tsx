import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

interface DialogContextType {
  dialogs: Record<string, boolean>; // Keeps track of which dialogs are open
  openDialog: (dialogId: string) => void; // Method to open a dialog
  closeDialog: (dialogId: string) => void; // Method to close a dialog
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Record<string, boolean>>({});

  const openDialog = useCallback((dialogId: string) => {
    setDialogs((prevDialogs) => ({ ...prevDialogs, [dialogId]: true }));
  }, []);

  const closeDialog = useCallback((dialogId: string) => {
    setDialogs((prevDialogs) => ({ ...prevDialogs, [dialogId]: false }));
  }, []);

  return (
    <DialogContext.Provider value={{ dialogs, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
