import { JustaName } from '@justaname.id/sdk';

export const justaname = JustaName.init({
  dev: process.env.DEV === 'true',
  networks: [
    {
      chainId: 1,
      providerUrl: process.env.MAINNET_PROVIDER as string,
    },
    {
      chainId: 11155111,
      providerUrl: process.env.SEPOLIA_PROVIDER as string,
    },
  ],
});
