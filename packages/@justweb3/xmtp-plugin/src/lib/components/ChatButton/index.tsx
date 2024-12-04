import { useMountedAccount } from '@justaname.id/react';
import { ArrowIcon, ClickableItem } from '@justweb3/ui';
import { Client, ClientOptions, useClient } from '@xmtp/react-sdk';
import { useEthersSigner } from '../../hooks';
import { XmtpEnvironment } from '../../plugins';
import { storeKeys, loadKeys, wipeKeys } from '../../utils/xmtp';

export interface ChatButtonProps {
  handleOpen: (open: boolean) => void;
  env: XmtpEnvironment;
}
export const ChatButton: React.FC<ChatButtonProps> = ({ handleOpen, env }) => {
  const { initialize } = useClient();
  const { client } = useClient();
  const walletClient = useEthersSigner()
  const { address } = useMountedAccount()

  const handleChat = async () => {
    if (!client) {
      const signer = await walletClient
      try {
        if (!signer) {
          return
        }
        const clientOptions: Partial<Omit<ClientOptions, 'codecs'>> = {
          appVersion: 'JustWeb3/1.0.0',
          env: env
        }
        let keys = loadKeys(address ?? '', env)
        if (!keys) {
          keys = await Client.getKeys(signer, {
            env: env,
            skipContactPublishing: false,
            // persistConversations: false,
          })
          storeKeys(address ?? '', keys, env)
        }
        await initialize({
          keys,
          options: clientOptions,
          signer: signer,
        }).then(() => {
          handleOpen(true);
        })

        // handleClient(client)
      } catch (error) {
        console.error('Failed to initialize XMTP Client:', error)
        wipeKeys(address ?? '', env)
      }
    } else {
      handleOpen(true);
    }
  };

  return (
    <ClickableItem
      title={'Chat'}
      left={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2.5C11.9884 2.49947 13.8956 3.28926 15.3021 4.69566C16.7086 6.10206 17.4992 8.00989 17.5 9.9995C17.4997 10.9847 17.3055 11.9603 16.9285 12.8704C16.5514 13.7806 15.9989 14.6075 15.3025 15.304C14.606 16.0005 13.7793 16.5529 12.8695 16.9297C11.9597 17.3065 10.9847 17.5003 10 17.5C8.694 17.5 7.09 17.1718 5.946 16.5524L3.156 17.475C3.06789 17.5039 2.97347 17.5078 2.8833 17.4861C2.79313 17.4644 2.71076 17.4181 2.6454 17.3523C2.58003 17.2865 2.53425 17.2037 2.51316 17.1134C2.49208 17.023 2.49652 16.9286 2.526 16.8406L3.452 14.0679C2.78 12.8942 2.5 11.3603 2.5 9.9995C2.5008 8.00989 3.29139 6.10206 4.69788 4.69566C6.10437 3.28926 8.01158 2.49947 10 2.5Z"
            fill="var(--justweb3-primary-color)"
          />
        </svg>
      }
      style={{
        width: '100%',
      }}
      onClick={handleChat}
      right={<ArrowIcon width={20} />}
    />
  );
};
