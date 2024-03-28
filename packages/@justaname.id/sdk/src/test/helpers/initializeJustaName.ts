import { JustaName } from '../../../src';

/**
 * Initializes the JustaName service with the provided API key.
 * @param {string} apiKey - The API key for authenticating with the JustaName service.
 * @returns {Promise<JustaName>} An instance of the JustaName service.
 */
export const initializeJustaName = async (apiKey: string) => {
  return await JustaName.init({
    apiKey: apiKey,
  });
}