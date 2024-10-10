import React, {
  FC,
  useContext,
  useMemo,
  useState,
  useCallback, useEffect, ReactNode
} from 'react';
import { useCanEnableMApps, useEnabledMApps, useEnsAuth, useMountedAccount, useRecords } from '@justaname.id/react';
import { EventEmitter } from '../../plugins/eventEmitter';
import { JustaPlugin, PluginApi } from '../../plugins';
import usePreviousState from '../../hooks/usePreviousState';
import { isEqual } from 'lodash';
export interface PluginContextProps {
  createPluginApi: (pluginName: string) => PluginApi;
}

export const PluginContext = React.createContext<PluginContextProps>({
  createPluginApi: () => {
    throw new Error('PluginContext must be used within PluginProvider');
  }
});


interface PluginProviderProps {
  children: React.ReactNode;
  plugins: JustaPlugin[];
  handleOpenSignInDialog: (open: boolean) => void;
  handleOpenAuthorizeMAppDialog: (mAppName: string, open: boolean) => void;
  handleOpenRevokeMAppDialog: (mAppName: string, open: boolean) => void;
  mApps?: string[];
}

export const PluginProvider: FC<PluginProviderProps> = ({
                                                          children,
                                                          plugins,
  handleOpenSignInDialog,
  handleOpenAuthorizeMAppDialog,
  handleOpenRevokeMAppDialog,
  mApps
                                                        }) => {
  const { connectedEns, isEnsAuthPending, isLoggedIn } = useEnsAuth();
  const { records } = useRecords({
    ens: connectedEns?.ens || "",
  });
  const { enabledMApps } = useEnabledMApps({
    ens: connectedEns?.ens || ''
  })
  const { canEnableMApps } = useCanEnableMApps({
    ens: connectedEns?.ens || ''
  });
  const { address, chain } = useMountedAccount();
  const previousConnectedEns = usePreviousState(
    connectedEns, [connectedEns, records, enabledMApps, canEnableMApps]
  )
  const previousChain = usePreviousState(chain, [chain]);
  const previousAddress = usePreviousState(address, [address]);
  const previousRecords = usePreviousState(records, [records]);
  const previousEnabledMApps = usePreviousState(enabledMApps, [enabledMApps]);

  const [pluginStates, setPluginStates] = useState<Record<string, Record<string, any>>>({});
  // const previousPluginStates = usePreviousState(pluginStates, [pluginStates]);
  const eventEmitter = useMemo(() => new EventEmitter(), []);

  const createPluginApi = useCallback(
    (pluginName: string): PluginApi => ({
      connectedEns,
      isEnsAuthPending,
      isLoggedIn,
      mApps: mApps || [],
      chainId: chain?.id,
      handleOpenSignInDialog,
      handleOpenAuthorizeMAppDialog,
      handleOpenRevokeMAppDialog,
      records,
      eventEmitter: new EventEmitter(),
      setState: function <T>(key: string, value: T): void {
        setPluginStates((prev) => ({
          ...prev,
          [pluginName]: {
            ...prev[pluginName],
            [key]: value
          }
        }));
      },
      getState: function <T>(key: string): T | undefined {
      return pluginStates[pluginName]?.[key];
      }
    }),
    [
      connectedEns,
      isEnsAuthPending,
      isLoggedIn,
      handleOpenSignInDialog,
      handleOpenAuthorizeMAppDialog,
      handleOpenRevokeMAppDialog,
      mApps,
      eventEmitter,
      pluginStates,
      records
    ]
  );

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (chain && previousChain && chain.id !== previousChain.id && plugin.hooks?.onSwitchChain) {
        try {
          plugin.hooks.onSwitchChain(pluginApi, previousChain.id, chain.id);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onSwitchChain hook:`, error);
        }
      }
    });

  }, [chain, previousChain]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (plugin.hooks?.onMount) {
        try {
          plugin.hooks.onMount(pluginApi);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onMount hook:`, error);
        }
      }
      // Handle onUnmount in cleanup
      return () => {
        if (plugin.hooks?.onUnmount) {
          try {
            plugin.hooks.onUnmount(pluginApi);
          } catch (error) {
            console.error(`Error in plugin ${plugin.name} onUnmount hook:`, error);
          }
        }
      };
    });
  }, [plugins]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (records && enabledMApps!==undefined && canEnableMApps!==undefined && connectedEns && !previousConnectedEns && plugin.hooks?.onEnsSignIn) {
        try {
          plugin.hooks.onEnsSignIn(pluginApi, connectedEns?.ens, chain?.id || 1, records, enabledMApps, canEnableMApps);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onUserSignIn hook:`, error);
        }
      }

      if (records && enabledMApps!==undefined && canEnableMApps!==undefined && connectedEns && previousConnectedEns && connectedEns.ens !== previousConnectedEns.ens && plugin.hooks?.onEnsChange) {
        try {
          plugin.hooks?.onEnsChange(pluginApi, connectedEns?.ens, records, enabledMApps, canEnableMApps);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onEnsChange hook:`, error);
        }
      }

      if (!connectedEns && previousConnectedEns && plugin.hooks?.onEnsSignOut) {
        try {
          plugin.hooks?.onEnsSignOut(pluginApi, previousConnectedEns?.ens);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onUserSignOut hook:`, error);
        }
      }
    });
  }, [plugins, connectedEns, previousConnectedEns, records, enabledMApps, canEnableMApps]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (address && !previousAddress  && plugin.hooks?.onWalletConnected) {
        try {
          plugin.hooks.onWalletConnected(pluginApi, address, chain?.id || 1);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onWalletConnected hook:`, error);
        }
      }

      if (address && previousAddress && address !== previousAddress && plugin.hooks?.onWalletChanged) {
        try {
          plugin.hooks.onWalletChanged(pluginApi, address, chain?.id || 1);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onWalletChanged hook:`, error);
        }
      }

      if (!address && previousAddress && plugin.hooks?.onWalletDisconnected) {
        try {
          plugin.hooks.onWalletDisconnected(pluginApi, previousAddress);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onWalletDisconnected hook:`, error);
        }
      }
    });
  }, [ plugins, address, previousAddress]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if(!records || enabledMApps === undefined || canEnableMApps === undefined || !connectedEns) {
        return
      }

      if (!isEqual(records, previousRecords) && plugin.hooks?.onRecordsChange) {
        try {
          plugin.hooks.onRecordsChange(pluginApi, connectedEns?.ens, records, enabledMApps, canEnableMApps);
        } catch (error) {
          console.error(`Error in plugin ${plugin.name} onRecordsChange hook:`, error);
        }
      }
    });
  }, [plugins, records, previousRecords, connectedEns, enabledMApps, canEnableMApps]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if(enabledMApps === undefined || !connectedEns || !previousEnabledMApps) {
        return
      }

      if (!isEqual(enabledMApps, previousEnabledMApps) && plugin.hooks?.onMAppAdd) {
        const addedMApp = enabledMApps.find(mApp => !previousEnabledMApps.includes(mApp));
        if(addedMApp) {
          try {
            plugin.hooks.onMAppAdd(pluginApi, connectedEns?.ens, addedMApp);
          } catch (error) {
            console.error(`Error in plugin ${plugin.name} onMAppAdd hook:`, error);
          }
        }
      }

      if (!isEqual(enabledMApps, previousEnabledMApps) && plugin.hooks?.onMAppRemove) {
        const removedMApp = previousEnabledMApps.find(mApp => !enabledMApps.includes(mApp));
        if(removedMApp) {
          try {
            plugin.hooks.onMAppRemove(pluginApi, connectedEns?.ens, removedMApp);
          } catch (error) {
            console.error(`Error in plugin ${plugin.name} onMAppRemove hook:`, error);
          }
        }
      }
    });
  }, [plugins, enabledMApps, previousEnabledMApps, connectedEns]);

  const globalComponentsArray: ReactNode[] = plugins?.reduce(
    (acc: ReactNode[], plugin: JustaPlugin) => {
      const component = plugin.components?.Global;

      if (!component) {
        return acc;
      }

      return [...acc, component(createPluginApi(plugin.name))];
    },
    []
  );

  const content = (
    <>
      {children}
      {globalComponentsArray}
    </>
  );

  const wrappedContent = plugins.reduceRight(
    (acc: ReactNode, plugin: JustaPlugin) => {
      const ProvidersComponent = plugin.components?.Providers;

      if (ProvidersComponent) {
        return ProvidersComponent(createPluginApi(plugin.name), acc);
      }
      return acc;
    },
    content
  );

  return (
    <PluginContext.Provider value={{
      createPluginApi
    }}>

      {wrappedContent}
    </PluginContext.Provider>
  );
};

export const usePlugins = (): PluginContextProps => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error('usePlugins must be used within PluginProvider');
  }

  return context;
}