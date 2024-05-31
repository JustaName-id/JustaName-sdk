import { JustaName } from '@justaname.id/sdk';

let justanameInstance: JustaName | null = null;

export const getJustaNameInstance = () => {
  if (!justanameInstance) {
    justanameInstance = JustaName.init({
      apiKey: process.env.JUSTANAME_API_KEY,
    });
  }
  return justanameInstance;
};
