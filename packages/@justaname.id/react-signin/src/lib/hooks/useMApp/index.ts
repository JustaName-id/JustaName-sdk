import { MAPPContext, MAPPContextProps, useSignInWithJustaName } from '../../providers';
import { useContext, useEffect, useMemo } from 'react';
import {
  useCanEnableMApps,
  useIsMAppEnabled,
  useRevokeMAppPermission,
  UseRequestRevokeMAppPermissionResult
} from '@justaname.id/react';

/**
  * useMApp hook
 *  @param {string} mApp - The mApp to use
 *  @param {boolean} openOnConnect - Whether to open the mApp dialog on connect default is true
 *  @default openOnConnect true
 *  @returns {UseMAppResult} An object containing the function to open the mApp dialog
 */
export interface UseMAppParams {
  mApp: string;
  openOnConnect?: boolean;
}

export interface UseMAppResult {
  handleOpenMAppDialog: (open: boolean) => void;
  revokeMAppPermission:  UseRequestRevokeMAppPermissionResult['revokeMAppPermission']
  isMAppEnabled: boolean | undefined;
  canOpenMAppDialog: boolean;
  isCanOpenMAppDialogPending: boolean;
}

export const useMApp = ({ mApp, openOnConnect = true }: UseMAppParams) : UseMAppResult => {
  const { handleRemoveMApp } = useContext<MAPPContextProps>(MAPPContext);
  const {
    mApps,
    handleOpenSignInDialog,
    handleOpenMAppDialog: handleOpenMAppDialogContext,
    connectedEns
  } = useSignInWithJustaName();
  const { revokeMAppPermission } = useRevokeMAppPermission({
    mApp
  })
  const { isMAppEnabled, isMAppEnabledPending } = useIsMAppEnabled({
    ens: connectedEns?.ens || '',
    mApp
  });
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns?.ens || ''
  });

  useEffect(() => {
    const isPending = isCanEnableMAppsPending || isMAppEnabledPending;
    const isAlreadyAdded = mApps.includes(mApp);

    if (isPending || isAlreadyAdded || !canEnableMApps) {
      return;
    }

    const toggleMApp = () => {
      if (isMAppEnabled) {
        handleRemoveMApp(mApp, true);
      } else {
        handleOpenMAppDialogContext(mApp, openOnConnect);
      }
    };

    toggleMApp();

  }, [mApps, isMAppEnabled, isMAppEnabledPending, canEnableMApps, isCanEnableMAppsPending, mApp]);


  const handleOpenMAppDialog = (open: boolean) => {
    if(!connectedEns){
      handleOpenSignInDialog(true);
      return
    }

    if(isMAppEnabledPending || isCanEnableMAppsPending){
      return
    }
    else {
      if (!isMAppEnabled && canEnableMApps) {
        handleOpenMAppDialogContext(mApp, open);
      }
    }
  }

  const canOpenMAppDialog = useMemo(()=>{
    return Boolean(connectedEns) ?
      Boolean(!isMAppEnabled) && Boolean(canEnableMApps) && Boolean(!isMAppEnabledPending) && Boolean(!isCanEnableMAppsPending)
      : true
  }, [connectedEns, isMAppEnabled, canEnableMApps, isMAppEnabledPending, isCanEnableMAppsPending]);

  const isCanOpenMAppDialogPending = useMemo(() => {
    return isMAppEnabledPending || isCanEnableMAppsPending
  }, [isMAppEnabledPending, isCanEnableMAppsPending]);

  return {
    handleOpenMAppDialog,
    revokeMAppPermission,
    isMAppEnabled,
    canOpenMAppDialog,
    isCanOpenMAppDialogPending
  }
}