import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string);
  const origin = process.env.JUSTANAME_ORIGIN as string;
  const domain = process.env.JUSTANAME_DOMAIN as string;
  const apiKey = process.env.JUSTANAME_API_KEY as string;

  if (!origin) {
    throw new Error('Origin is required');
  }

  if (!chainId) {
    throw new Error('ChainId is required');
  }

  if (chainId !== 1 && chainId !== 11155111) {
    throw new Error('ChainId is not supported');
  }

  if (!domain) {
    throw new Error('Domain is required');
  }

  if (!apiKey) {
    throw new Error('API Key is required');
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
