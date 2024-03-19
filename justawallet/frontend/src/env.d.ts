/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_ENS_DOMAIN: string
  readonly VITE_APP_CHAIN_ID: 1 | 11155111
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}