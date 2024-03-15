import { JustaName } from '../../../src';

export const initializeJustaName = async (apiKey: string) => {
  return await JustaName.init({
    apiKey: apiKey,
  });
}