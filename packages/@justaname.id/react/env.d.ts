/// <reference types="vite/client" />

interface ImportMetaEnv {
  STORYBOOK_APP_CHAIN_ID: string;
  STORYBOOK_APP_ORIGIN: string;
  STORYBOOK_APP_DOMAIN: string;
  STORYBOOK_APP_BACKEND_URL: string;
  STORYBOOK_APP_MAINNET_PROVIDER_URL: string;
  STORYBOOK_APP_SEPOLIA_PROVIDER_URL: string;
  STORYBOOK_APP_ENS_DOMAIN: string;
  STORYBOOK_APP_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
