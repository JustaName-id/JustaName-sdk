import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useAccount, WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Meta, StoryObj } from '@storybook/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { JustaNameProvider, JustaNameProviderConfig } from '../lib/providers';
import { splitDomain } from '../lib/helpers';
import {
  useAccountSubnames,
  useAddSubname,
  useIsSubnameAvailable,
  useRevokeSubname,
} from '../lib/hooks';
import { useEffect, useMemo, useState } from 'react';

const queryClient = new QueryClient();

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue };
};

const justanameConfig: JustaNameProviderConfig = {
  config: {
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,
    signInTtl: 1000 * 60 * 60 * 24,
  },
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  ensDomains: [
    {
      ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
      chainId: 1,
    },
  ],
  networks: [
    {
      chainId: 1,
      providerUrl: import.meta.env.STORYBOOK_APP_MAINNET_PROVIDER_URL,
    },
    {
      chainId: 11155111,
      providerUrl: import.meta.env.STORYBOOK_APP_SEPOLIA_PROVIDER_URL,
    },
  ],
  // dev: import.meta.env.STORYBOOK_APP_DEV === 'true',
};

const AddSubname = () => {
  const { isConnected } = useAccount();
  const { accountSubnames } = useAccountSubnames();
  const { addSubname } = useAddSubname();

  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const debouncedUsername = useDebounce(username, 500);

  const { isSubnameAvailable } = useIsSubnameAvailable({
    username: debouncedUsername.debouncedValue,
  });

  const claimedSubname = useMemo(() => {
    return accountSubnames.find((subname) =>
      subname.ens.endsWith(import.meta.env.STORYBOOK_APP_ENS_DOMAIN as string)
    );
  }, [accountSubnames]);

  const { revokeSubname } = useRevokeSubname();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ConnectButton />

      {isConnected && !claimedSubname && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSubname({
              username: debouncedUsername.debouncedValue,
              text:
                key && value
                  ? {
                      [key]: value,
                    }
                  : undefined,
            });
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="text-center relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a subname"
              className="p-4 border border-gray-300 rounded-md w-80"
            />

            <div className="absolute top-[2px] bottom-[2px] right-[2px] pr-5 flex items-center bg-white rounded-md">
              <p className="text-sm text-gray-400">
                {import.meta.env.STORYBOOK_APP_ENS_DOMAIN}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key"
              className="p-4 border border-gray-300 rounded-md w-80"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value"
              className="p-4 border border-gray-300 rounded-md w-80"
            />
          </div>
          <button
            type="submit"
            disabled={
              !isSubnameAvailable ||
              !!(key.length > 0 && value === '') ||
              !!(key === '' && value.length > 0)
            }
            className={`p-4 bg-blue-500 text-white rounded-md w-80 ${
              !isSubnameAvailable ||
              !!(key.length > 0 && value === '') ||
              !!(key === '' && value.length > 0)
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
          >
            Add Subname
          </button>
        </form>
      )}
      {claimedSubname && isConnected && (
        <div className="text-center flex flex-col items-center gap-4">
          {claimedSubname?.ens}

          <button
            onClick={() => {
              const [username, ensDomain] = splitDomain(
                claimedSubname?.ens as string
              );
              revokeSubname({
                username,
                ensDomain,
                chainId: 1,
              });
            }}
            className="p-4 bg-red-500 text-white rounded-md w-80 cursor-pointer"
          >
            Revoke Subname
          </button>
        </div>
      )}
    </div>
  );
};

export const Example = () => {
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia],
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustaNameProvider config={justanameConfig}>
            <h1>JustaName</h1>
            <AddSubname />
          </JustaNameProvider>
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Hooks/React',
};
export default meta;
type Story = StoryObj<typeof Example>;
