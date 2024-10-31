import { UseEnsAuthReturn, UseRecordsResult } from '@justaname.id/react';
import { EventEmitter } from './eventEmitter';
import { ReactNode } from 'react';
import { ChainId } from '@justaname.id/sdk';

export interface PluginApi {
  connectedEns: UseEnsAuthReturn['connectedEns'];
  isEnsAuthPending: boolean;
  isLoggedIn: boolean;
  chainId: number | undefined;
  records: UseRecordsResult['records'];
  mApps: string[];
  setState: <T>(key: string, value: T) => void;
  getState: <T>(key: string) => T | undefined;

  eventEmitter: EventEmitter;

  handleOpenAuthorizeMAppDialog: (mApp: string, open: boolean) => void;
  handleOpenRevokeMAppDialog: (mApp: string, open: boolean) => void;
  handleOpenSignInDialog: (open: boolean) => void;
}

type PluginProviderComponent = (
  pluginApi: PluginApi,
  children: ReactNode
) => ReactNode;
type PluginComponent = (pluginApi: PluginApi) => ReactNode;
type PluginRichComponent = (
  pluginApi: PluginApi,
  ens: string,
  chainId: ChainId,
  address: string
) => ReactNode | undefined;
type ProfileTabPluginComponent = (
  pluginApi: PluginApi,
  ens: string,
  chainId: ChainId,
  address: string
) => { title: string; content: ReactNode } | undefined;

interface PluginComponents {
  Provider?: PluginProviderComponent;
  Global?: PluginComponent;
  SignInMenu?: PluginComponent;
  ProfileSection?: PluginRichComponent;
  ProfileHeader?: PluginRichComponent;
  ProfileTab?: ProfileTabPluginComponent;
}

type OnMountHook = (pluginApi: PluginApi) => void;
type OnUnmountHook = (pluginApi: PluginApi) => void;
type OnWalletConnectedHook = (
  pluginApi: PluginApi,
  address: string,
  chainId: number
) => void;
type OnWalletDisconnectedHook = (pluginApi: PluginApi, address: string) => void;
type OnWalletChangedHook = (
  pluginApi: PluginApi,
  address: string,
  chainId: number
) => void;
type OnEnsSignInHook = (
  pluginApi: PluginApi,
  ens: string,
  chainId: number,
  records: UseRecordsResult['records'],
  enabledMApps: string[],
  canEnableMApps: boolean
) => void;
type OnEnsChangeHook = (
  pluginApi: PluginApi,
  ens: string,
  records: UseRecordsResult['records'],
  enabledMApps: string[],
  canEnableMApps: boolean
) => void;
type OnEnsSignOutHook = (pluginApi: PluginApi, ens: string) => void;
type OnMAppAddHook = (pluginApi: PluginApi, ens: string, mApp: string) => void;
type OnMAppRemoveHook = (
  pluginApi: PluginApi,
  ens: string,
  mApp: string
) => void;
type OnRecordsChangeHook = (
  pluginApi: PluginApi,
  ens: string,
  records: UseRecordsResult['records'],
  enabledMApps: string[],
  canEnableMApps: boolean
) => void;
type OnSubnameClaimedHook = (pluginApi: PluginApi, subname: string) => void;
type OnSwitchChain = (
  pluginApi: PluginApi,
  fromChain: number,
  toChain: number
) => void;

interface Hooks {
  onMount?: OnMountHook;
  onUnmount?: OnUnmountHook;
  onWalletConnected?: OnWalletConnectedHook;
  onWalletDisconnected?: OnWalletDisconnectedHook;
  onWalletChanged?: OnWalletChangedHook;
  onEnsSignIn?: OnEnsSignInHook;
  onEnsSignOut?: OnEnsSignOutHook;
  onSwitchChain?: OnSwitchChain;
  onSubnameClaimed?: OnSubnameClaimedHook;
  onEnsChange?: OnEnsChangeHook;
  onMAppAdd?: OnMAppAddHook;
  onMAppRemove?: OnMAppRemoveHook;
  onRecordsChange?: OnRecordsChangeHook;
  onStateChange?: (
    pluginApi: PluginApi,
    pluginName: string,
    key: string,
    value: any
  ) => void;
}

export interface JustaPlugin {
  name: string;

  components?: PluginComponents;

  mApps?: string[];

  hooks?: Hooks;

  priority?: number;
}
