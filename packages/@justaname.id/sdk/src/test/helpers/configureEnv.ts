/**
 * Dynamically imports the dotenv package and configures environment variables from a .env file.
 * It then loads these variables into process.env. This function uses asynchronous import to 
 * defer loading the dotenv package until it's actually needed, which can optimize startup time.
 * @returns {Promise<void>} A promise that resolves once the environment variables have been configured.
 */
export const configureEnv =async (): Promise<void> => {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env' });
}