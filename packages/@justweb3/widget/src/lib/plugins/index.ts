import { UseEnsAuthReturn, UseRecordsResult } from '@justaname.id/react';
import { EventEmitter } from './eventEmitter';
import { ReactNode } from 'react';
import { ChainId } from '@justaname.id/sdk';
import { JustWeb3ProviderConfig } from '../types/config';

export interface PluginApi {
  connectedEns: UseEnsAuthReturn['connectedEns'];
  isEnsAuthPending: boolean;
  isLoggedIn: boolean;
  chainId: number | undefined;
  records: UseRecordsResult['records'];
  setState: <T>(key: string, value: T) => void;
  getState: <T>(key: string) => T | undefined;
  config: JustWeb3ProviderConfig;

  eventEmitter: EventEmitter;

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
type BadgePluginComponent = (
  pluginApi: PluginApi,
  ens: string,
  chainId: ChainId,
  address: string
) => ReactNode | undefined;

interface PluginComponents {
  Provider?: PluginProviderComponent;
  Global?: PluginComponent;
  SignInMenu?: PluginComponent;
  JustWeb3ButtonRight?: PluginComponent;
  ProfileSection?: PluginRichComponent;
  ProfileHeader?: PluginRichComponent;
  ProfileTab?: ProfileTabPluginComponent;
  Badge?: BadgePluginComponent;
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
  records: UseRecordsResult['records']
) => void;
type OnEnsChangeHook = (
  pluginApi: PluginApi,
  ens: string,
  records: UseRecordsResult['records']
) => void;
type OnEnsSignOutHook = (pluginApi: PluginApi, ens: string) => void;
type OnRecordsChangeHook = (
  pluginApi: PluginApi,
  ens: string,
  records: UseRecordsResult['records']
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

  hooks?: Hooks;

  priority?: number;
}
