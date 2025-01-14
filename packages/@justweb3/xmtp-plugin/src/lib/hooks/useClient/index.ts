import { Client, type Signer, type ClientOptions } from '@xmtp/browser-sdk';
import { useAccount } from 'wagmi';
import { useState, useCallback, useEffect } from 'react';
import { useEthersSigner } from '../useEthersSigner';
import { arrayify } from '@ethersproject/bytes';
import { AttachmentCodec } from '@xmtp/content-type-remote-attachment';
import { ReactionCodec } from '@xmtp/content-type-reaction';
import { ReplyCodec } from '@xmtp/content-type-reply';
import { ReadReceiptCodec } from '@xmtp/content-type-read-receipt';

function storeKeys(address: string, key: Uint8Array, env: string) {
  localStorage.setItem(
    `xmtp_keys_${env}_${address}`,
    JSON.stringify(Array.from(key))
  );
}

function loadKeys(address: string, env: string) {
  const stored = localStorage.getItem(`xmtp_keys_${env}_${address}`);
  return stored ? new Uint8Array(JSON.parse(stored)) : null;
}

function wipeKeys(address: string, env: string) {
  localStorage.removeItem(`xmtp_keys_${env}_${address}`);
}

export function useXMTPClient(env: 'dev' | 'production' | 'local' = 'dev') {
  const { address, chainId } = useAccount();
  const wagmiSigner = useEthersSigner({ chainId });
  const [client, setClient] = useState<Client>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [rejected, setRejected] = useState<boolean>(false);

  const initializeXmtp = useCallback(async (
    skipIsInitializing = false
  ) => {
    try {
    if (!address || !wagmiSigner || client) return;
    
    if (isInitializing && !skipIsInitializing) return;

    setIsInitializing(true);

    const signer: Signer = {
      getAddress: () => Promise.resolve(address),
      signMessage: async (message) => {
        const signature = await wagmiSigner.signMessage(message);
        return arrayify(signature);
      },
    };

    let encryptionKey = loadKeys(address, env);

    if (!encryptionKey) {
      encryptionKey = window.crypto.getRandomValues(new Uint8Array(32));
      storeKeys(address, encryptionKey, env);
    }

    const options: ClientOptions = {
      env: env,
      codecs: [
        new AttachmentCodec(),
        new ReactionCodec(),
        new ReplyCodec(),
        new ReadReceiptCodec(),
      ],
    };

      const newClient = await Client.create(signer, encryptionKey, options);
      if (newClient.accountAddress !== address) {
        wipeKeys(address, env);
        const freshKey = window.crypto.getRandomValues(new Uint8Array(32));
        storeKeys(address, freshKey, env);
        setClient(await Client.create(signer, freshKey, options));
      } else {
        setClient(newClient);
      }
    } catch (e) {
      console.error('Failed to initialize XMTP Client:', error);
      wipeKeys(address ?? '', env);
      setError(e as Error);
      setRejected(true);
    } finally {
      setIsInitializing(false);
    }
  }, [address, wagmiSigner, client, env]);

  useEffect(() => {
    if (!client && !isInitializing && address && wagmiSigner) {
      initializeXmtp();
    }
  }, [client, isInitializing, address, wagmiSigner, initializeXmtp]);

  return {
    client,
    initializeXmtp,
    isInitializing,
    error,
    rejected,
  };
}
