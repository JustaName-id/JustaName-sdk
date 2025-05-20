import { JustWeb3Context } from '@justweb3/widget';
import React, { useContext, useMemo } from 'react';
import { useJustWeb3Theme } from '@justweb3/ui';
import { Highlight, themes } from 'prism-react-renderer';
import { getAnalyticsClient } from '../../../../analytics';
import { useConsoleStore } from '../../../../providers/ConsoleStoreProvider';
interface CodeSectionProps {
  mobile?: boolean;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ mobile }) => {
  const { config } = useContext(JustWeb3Context);
  const { color } = useJustWeb3Theme();
  const justVerified = useConsoleStore((state) => state.justVerified);
  const justVerifiedEnabled = useMemo(
    () => config.plugins?.find((p) => p.name === 'JustVerifiedPlugin'),
    [config]
  );

  const efpPluginEnabled = useMemo(
    () => config.plugins?.find((p) => p.name === 'EFPPlugin'),
    [config]
  );

  const poapPluginEnabled = useMemo(
    () => config.plugins?.find((p) => p.name === 'POAPPlugin'),
    [config]
  );

  const talentProtocolPluginEnabled = useMemo(
    () => config.plugins?.find((p) => p.name === 'TalentProtocolPlugin'),
    [config]
  );

  const xmtpPluginEnabled = useMemo(
    () => config.plugins?.find((p) => p.name === 'XMTPPlugin'),
    [config]
  );

  const codeSnippet = useMemo(() => {
    const plugins = [];

    if (justVerifiedEnabled) {
      plugins.push(
        `%%JustVerifiedPlugin([${justVerified
          .map((v) => `'${v}'`)
          .join(', ')}])%%`
      );
    }

    if (efpPluginEnabled) {
      plugins.push('%%EFPPlugin%%');
    }

    if (poapPluginEnabled) {
      plugins.push("%%POAPPlugin({ apiKey: '<YOUR_POAP_API_KEY>' })%%");
    }

    if (talentProtocolPluginEnabled) {
      plugins.push(
        "%%TalentProtocolPlugin({ apiKey: '<YOUR_TALENT_PROTOCOL_API_KEY>' })%%"
      );
    }

    if (xmtpPluginEnabled) {
      plugins.push("%%XMTPPlugin('production')%%");
    }

    return `
import '@rainbow-me/rainbowkit/styles.css';
import '@justweb3/widget/styles.css';
import React from 'react';
import { 
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { 
  argentWallet,
  ledgerWallet,
  trustWallet
} from '@rainbow-me/rainbowkit/wallets';
import {
  QueryClient, 
  QueryClientProvider 
} from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { 
  JustWeb3Provider, 
  JustWeb3ProviderConfig, 
  JustWeb3Button
} from '@justweb3/widget';
import { ConnectButton } from '@rainbow-me/rainbowkit';
${justVerifiedEnabled
        ? "import { JustVerifiedPlugin } from '@justverified/plugin';"
        : ''
      }
${efpPluginEnabled ? "import { EFPPlugin } from '@justweb3/efp-plugin';" : ''}
${poapPluginEnabled ? "import { POAPPlugin } from '@justweb3/poap-plugin';" : ''
      }
${talentProtocolPluginEnabled
        ? `import { TalentProtocolPlugin } from '@justweb3/talent-protocol-plugin';`
        : ''
      }
${xmtpPluginEnabled ? "import { XMTPPlugin } from '@justweb3/xmtp-plugin';" : ''
      }

export const App: React.FC = () => {
    const { wallets } = getDefaultWallets();
    
    const config = getDefaultConfig({
      appName: 'RainbowKit demo',
      projectId: 'YOUR_PROJECT_ID',
      wallets: [
        ...wallets,
        {
          groupName: 'Other',
          wallets: [argentWallet, trustWallet, ledgerWallet],
        }
      ],
      chains: [mainnet, sepolia],
      ssr: true
    });
  
    const justweb3Config: JustWeb3ProviderConfig = ${JSON.stringify(
        {
          ...config,
          networks: [
            {
              chainId: 1,
              providerUrl: `<MAINNET_PROVIDER_URL>`,
            },
            {
              chainId: 11155111,
              providerUrl: `<SEPOLIA_PROVIDER_URL>`,
            },
          ],
          dev: undefined,
          disableOverlay: undefined,
          plugins: plugins.length > 0 ? plugins : undefined,
          color: color,
        },
        null,
        2
      )};
  
    const queryClient = new QueryClient();
  
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <JustWeb3Provider config={justweb3Config}>
              <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>
            </JustWeb3Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
};

export default App;`.trim();
  }, [
    color,
    config,
    efpPluginEnabled,
    justVerified,
    justVerifiedEnabled,
    poapPluginEnabled,
    talentProtocolPluginEnabled,
    xmtpPluginEnabled,
  ]);

  const code = useMemo(() => {
    const prefix = /"%%/g;
    const suffix = /%%"/g;
    return codeSnippet.replaceAll(prefix, '').replaceAll(suffix, '');
  }, [codeSnippet]);

  const dependencies = useMemo(() => {
    return `yarn add ${xmtpPluginEnabled ? '@justweb3/xmtp-plugin' : ''} ${justVerifiedEnabled ? '@justverified/plugin' : ''
      } ${poapPluginEnabled ? '@justweb3/poap-plugin' : ''} ${efpPluginEnabled ? '@justweb3/efp-plugin' : ''
      }
     ${talentProtocolPluginEnabled ? '@justweb3/talent-protocol-plugin' : ''}
     @justweb3/widget viem wagmi @rainbow-me/rainbowkit @tanstack/react-query ethers`;
  }, [
    efpPluginEnabled,
    justVerifiedEnabled,
    poapPluginEnabled,
    talentProtocolPluginEnabled,
    xmtpPluginEnabled,
  ]);

  const handleDependenciesCopy = () => {
    navigator.clipboard.writeText(dependencies);
  };

  const handleCopy = () => {
    getAnalyticsClient().track('CODE_COPIED', {})
    navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={`h-full mobile:w-[calc(100% - 1.25rem)]  border-l-[1px] pointer-events-auto flex flex-col max-h-[calc(100vh-60px)] overflow-y-auto ${mobile ? 'pb-5' : 'py-5'
        } px-2.5 gap-5 justify-between`}
    >
      <div
        className={`flex justify-between items-center ${mobile ? 'absolute top-4 right-6 ' : ''
          }`}
      >
        {!mobile && <p className="text-sm font-medium leading-[140%]">Code</p>}
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-sm font-medium leading-[140%]">Dependencies</p>

        <div className="flex p-2 bg-gray-100 rounded-md pr-[46px] relative max-w-full overflow-hidden">
          <div
            className={
              'max-w-[500px] flex justify-between items-center  overflow-x-scroll'
            }
          >
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {dependencies}
            </span>
          </div>

          <button
            onClick={handleDependenciesCopy}
            className="text-sm font-medium leading-[140%] text-blue-500 hover:text-blue-700 top-0 bottom-0 right-2 absolute"
          >
            Copy
          </button>
        </div>
      </div>

      <div className={`flex justify-between items-center`}>
        <p className="text-sm font-medium leading-[140%]">Snippet</p>

        <button
          onClick={handleCopy}
          className="text-sm font-medium leading-[140%] text-blue-500 hover:text-blue-700"
        >
          Copy
        </button>
      </div>
      <div className="max-w-full overflow-x-scroll">
        <Highlight code={code} language="tsx" theme={themes.vsLight}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} relative`}
              style={{ ...style, fontSize: '12px' }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  style={{ display: 'table-row' }}
                >
                  <span
                    style={{
                      display: 'table-cell',
                      textAlign: 'right',
                      paddingRight: '1em',
                      userSelect: 'none',
                      opacity: 0.5,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ display: 'table-cell' }}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
