import { JustaName } from '@justaname.id/sdk';

let justanameInstance: JustaName | null = null;

export const getJustaNameInstance = async () => {
  if (!justanameInstance) {
    justanameInstance = await JustaName.init({
      apiKey: process.env.JUSTANAME_API_KEY,
    });
  }
  return justanameInstance;
};
