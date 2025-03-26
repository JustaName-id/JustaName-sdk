import { arrayify } from '@ethersproject/bytes';
import { Client, type Signer } from '@xmtp/browser-sdk';
import { ReactionCodec } from '@xmtp/content-type-reaction';
import { AttachmentCodec } from '@xmtp/content-type-remote-attachment';
import { ReplyCodec } from '@xmtp/content-type-reply';
import { JsonRpcSigner } from 'ethers';
import { useCallback, useContext, useRef, useState } from 'react';
import { XMTPContext } from '../../contexts/XMTPContext';
import { ReadReceiptCodec } from '@xmtp/content-type-read-receipt';
import { useAccount } from 'wagmi';

export type InitializeClientOptions = {
  signer: JsonRpcSigner;
};

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

export const useXMTPClient = (onError?: (error: Error) => void) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [rejected, setRejected] = useState(false);
  const initializingRef = useRef(false);
  const { address } = useAccount();

  const { client, setClient, env } = useContext(XMTPContext);

  const initializeXmtp = useCallback(
    async ({ signer }: InitializeClientOptions) => {
      if (!client) {
        if (initializingRef.current) {
          return undefined;
        }

        initializingRef.current = true;
        setError(null);
        setIsInitializing(true);
        setRejected(false);

        let xmtpClient: Client;

        try {
          let encryptionKey = loadKeys(address ?? '', env);
          if (!encryptionKey) {
            encryptionKey = window.crypto.getRandomValues(new Uint8Array(32));
            storeKeys(address ?? '', encryptionKey, env);
          }

          // Create XMTP signer that converts ethers signatures to Uint8Array
          const xmtpSigner: Signer = {
            type: 'EOA',
            getIdentifier: async () => {
              const signerAddress = await signer.getAddress();
              return {
                identifier: signerAddress,
                identifierKind: 'Ethereum',
              };
            },
            signMessage: async (message: string) => {
              const signature = await signer.signMessage(message);
              return arrayify(signature);
            },
          };

          xmtpClient = await Client.create(xmtpSigner, encryptionKey, {
            env,
            codecs: [
              new AttachmentCodec(),
              new ReactionCodec(),
              new ReplyCodec(),
              new ReadReceiptCodec(),
            ],
          });
          setClient(xmtpClient);
          storeKeys(address ?? '', encryptionKey, env);
          await xmtpClient.conversations.syncAll();
          await xmtpClient.conversations.sync();
          return xmtpClient;
        } catch (e) {
          setClient(undefined);
          setError(e as Error);
          wipeKeys(address ?? '', env);
          setRejected(true);
          onError?.(e as Error);
          throw e;
        } finally {
          initializingRef.current = false;
          setIsInitializing(false);
        }
      }
      return client;
    },
    [client, onError, setClient, env, address]
  );

  return {
    client,
    initializeXmtp,
    error,
    isInitializing,
    rejected,
  };
};
