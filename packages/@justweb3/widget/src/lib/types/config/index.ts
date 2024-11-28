import { JustaNameProviderConfig } from '@justaname.id/react';
import { JustWeb3ThemeProviderConfig } from '@justweb3/ui';
import { JustaPlugin } from '../../plugins';

export interface JustWeb3ProviderConfig
  extends JustaNameProviderConfig,
    JustWeb3ThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedEns?: 'all' | 'claimable' | string[];
  logo?: string;
  disableOverlay?: boolean;
  mApps?: (string | { name: string; openOnConnect: boolean })[];
  plugins?: JustaPlugin[];
}
