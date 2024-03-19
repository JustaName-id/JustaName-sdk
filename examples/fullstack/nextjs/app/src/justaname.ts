import { JustaName } from '@justaname.id/sdk';
import { ChainId } from '@justaname.id/sdk';

let justanameInstance: JustaName | null = null;

export const justanameConfig = {
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string) as ChainId,
  domain: process.env.NEXT_PUBLIC_ENS_DOMAIN as string,
  origin: process.env.NEXT_PUBLIC_ORIGIN as string,
};

export const getJustaNameInstance = async () => {
  if (!justanameInstance) {
    justanameInstance = await JustaName.init({
      apiKey: process.env.JUSTANAME_API_KEY,
    });
  }
  return justanameInstance;
};
