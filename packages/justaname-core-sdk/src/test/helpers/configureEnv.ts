export const configureEnv =async (): Promise<void> => {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env' });
}