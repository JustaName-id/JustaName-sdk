import { XmtpEnvironment } from '../../plugins';

export const buildLocalStorageKey = (
  walletAddress: string,
  env: XmtpEnvironment
) => {
  return `xmtp:${env}:keys:${walletAddress}`;
};
const ENCODING = 'binary';

export const storeKeys = (
  walletAddress: string,
  keys: Uint8Array,
  env: XmtpEnvironment
) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress, env),
    Buffer.from(keys).toString(ENCODING)
  );
};

export const loadKeys = (
  walletAddress: string,
  env: XmtpEnvironment
): Uint8Array | null => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress, env));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const wipeKeys = (walletAddress: string, env: XmtpEnvironment) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress, env));
};
