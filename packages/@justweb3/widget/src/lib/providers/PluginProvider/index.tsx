import React, {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useEnsAuth,
  useMountedAccount,
  useRecords,
} from '@justaname.id/react';
import { EventEmitter } from '../../plugins/eventEmitter';
import { JustaPlugin, PluginApi } from '../../plugins';
import usePreviousState from '../../hooks/usePreviousState';
import { isEqual } from 'lodash';
import { JustWeb3ProviderConfig } from '../../types/config';

export interface PluginContextProps {
  createPluginApi: (pluginName: string) => PluginApi;
}

export const PluginContext = React.createContext<PluginContextProps>({
  createPluginApi: () => {
    throw new Error('PluginContext must be used within PluginProvider');
  },
});

interface PluginProviderProps {
  children: React.ReactNode;
  plugins: JustaPlugin[];
  handleOpenSignInDialog: (open: boolean) => void;
  config: JustWeb3ProviderConfig;
}

export const PluginProvider: FC<PluginProviderProps> = ({
  children,
  plugins,
  handleOpenSignInDialog,
  config,
}) => {
  const { connectedEns, isEnsAuthPending, isLoggedIn } = useEnsAuth({
    local: !config.enableAuth,
  });
  const { records } = useRecords({
    ens: connectedEns?.ens || '',
  });
  const { address, chain } = useMountedAccount();
  const previousConnectedEns = usePreviousState(connectedEns, [
    connectedEns,
    records,
  ]);
  const previousChain = usePreviousState(chain, [chain]);
  const previousAddress = usePreviousState(address, [address]);
  const previousRecords = usePreviousState(records, [records]);

  const [pluginStates, setPluginStates] = useState<
    Record<string, Record<string, any>>
  >({});
  // const previousPluginStates = usePreviousState(pluginStates, [pluginStates]);
  const eventEmitter = useMemo(() => new EventEmitter(), []);

  const createPluginApi = useCallback(
    (pluginName: string): PluginApi => ({
      connectedEns,
      isEnsAuthPending,
      isLoggedIn,
      chainId: chain?.id,
      handleOpenSignInDialog,
      records,
      config,
      eventEmitter: new EventEmitter(),
      setState: function <T>(key: string, value: T): void {
        setPluginStates((prev) => ({
          ...prev,
          [pluginName]: {
            ...prev[pluginName],
            [key]: value,
          },
        }));
      },
      getState: function <T>(key: string): T | undefined {
        return pluginStates[pluginName]?.[key];
      },
    }),
    [
      connectedEns,
      isEnsAuthPending,
      isLoggedIn,
      handleOpenSignInDialog,
      eventEmitter,
      pluginStates,
      records,
    ]
  );

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (
        chain &&
        previousChain &&
        chain.id !== previousChain.id &&
        plugin.hooks?.onSwitchChain
      ) {
        try {
          plugin.hooks.onSwitchChain(pluginApi, previousChain.id, chain.id);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onSwitchChain hook:`,
            error
          );
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
            console.error(
              `Error in plugin ${plugin.name} onUnmount hook:`,
              error
            );
          }
        }
      };
    });
  }, [plugins]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (
        records &&
        connectedEns &&
        !previousConnectedEns &&
        plugin.hooks?.onEnsSignIn
      ) {
        try {
          plugin.hooks.onEnsSignIn(
            pluginApi,
            connectedEns?.ens,
            chain?.id || 1,
            records
          );
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onUserSignIn hook:`,
            error
          );
        }
      }

      if (
        records &&
        connectedEns &&
        previousConnectedEns &&
        connectedEns.ens !== previousConnectedEns.ens &&
        plugin.hooks?.onEnsChange
      ) {
        try {
          plugin.hooks?.onEnsChange(pluginApi, connectedEns?.ens, records);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onEnsChange hook:`,
            error
          );
        }
      }

      if (!connectedEns && previousConnectedEns && plugin.hooks?.onEnsSignOut) {
        try {
          plugin.hooks?.onEnsSignOut(pluginApi, previousConnectedEns?.ens);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onUserSignOut hook:`,
            error
          );
        }
      }
    });
  }, [plugins, connectedEns, previousConnectedEns, records]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (address && !previousAddress && plugin.hooks?.onWalletConnected) {
        try {
          plugin.hooks.onWalletConnected(pluginApi, address, chain?.id || 1);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onWalletConnected hook:`,
            error
          );
        }
      }

      if (
        address &&
        previousAddress &&
        address !== previousAddress &&
        plugin.hooks?.onWalletChanged
      ) {
        try {
          plugin.hooks.onWalletChanged(pluginApi, address, chain?.id || 1);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onWalletChanged hook:`,
            error
          );
        }
      }

      if (!address && previousAddress && plugin.hooks?.onWalletDisconnected) {
        try {
          plugin.hooks.onWalletDisconnected(pluginApi, previousAddress);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onWalletDisconnected hook:`,
            error
          );
        }
      }
    });
  }, [plugins, address, previousAddress]);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      const pluginApi = createPluginApi(plugin.name);

      if (!records || !connectedEns) {
        return;
      }

      if (!isEqual(records, previousRecords) && plugin.hooks?.onRecordsChange) {
        try {
          plugin.hooks.onRecordsChange(pluginApi, connectedEns?.ens, records);
        } catch (error) {
          console.error(
            `Error in plugin ${plugin.name} onRecordsChange hook:`,
            error
          );
        }
      }
    });
  }, [plugins, records, previousRecords, connectedEns]);

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
      const ProvidersComponent = plugin.components?.Provider;

      if (ProvidersComponent) {
        return ProvidersComponent(createPluginApi(plugin.name), acc);
      }
      return acc;
    },
    content
  );

  return (
    <PluginContext.Provider
      value={{
        createPluginApi,
      }}
    >
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
};
