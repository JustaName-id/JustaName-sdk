import { JustaName } from '@justaname.id/sdk';

let justaname: JustaName | undefined;

export const getJustaname = () => {
  if (!justaname) {
    justaname = JustaName.init({
      dev: process.env.DEV === 'true',
      networks: [
        {
          chainId: 1,
          providerUrl: process.env.MAINNET_PROVIDER_URL as string,
        },
        {
          chainId: 11155111,
          providerUrl: process.env.SEPOLIA_PROVIDER_URL as string,
        },
      ],
    });
  }

  return justaname;
};
