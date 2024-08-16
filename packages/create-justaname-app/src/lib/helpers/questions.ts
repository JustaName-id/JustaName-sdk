import { confirm, input, select } from '@inquirer/prompts';
import { validateApiKey, validateDomain, validateInput } from './validate';

/**
 * Types representing the choices of technology stacks for different parts of the application.
 */
export type FrontendFramework = 'react' | 'react-native' | 'expo';

export type FullstackFramework = 'nextjs';

export type BackendFramework = 'express' | 'nestjs' | 'koa' | 'hapi' | 'fastify';

export type Network = 'mainnet' | 'testnet';

/**
 * Defines the structure for storing details about the application collected from the user.
 */
export interface AppDetails {
  appName: string;
  frontendFramework?: FrontendFramework;
  backendFramework?: BackendFramework;
  fullstackFramework?: FullstackFramework;
  apiKey: string;
  appUrl: string;
  ensDomain: string;
  directory: string;
  network: Network;
  appDir?: boolean;
}

/**
 * Prompts the user for various pieces of information regarding their application setup,
 * including framework preferences, API key, URL, ENS domain, and deployment network.
 *
 * @returns {Promise<AppDetails>} A promise that resolves to an object containing the collected app details.
 */
export const collectAppDetails = async (): Promise<AppDetails> => {

  let appDir = false;
  let backendFramework: BackendFramework | undefined;

  const appName = await input({
    message: 'What is the name of your app?',
    validate: (input: string) => validateInput(input, 'App name')
  });

  const frontendFramework = await select<FrontendFramework | FullstackFramework>({
    choices: [{
      name: 'React',
      value: 'react'
    },
      {
        name: 'Next.js',
        value: 'nextjs'
      },
      {
        name: 'React Native',
        value: 'react-native'
      },
      {
        name: 'Expo',
        value: 'expo'
      }
    ],
    message: 'Which frontend framework do you want?'
  });

  if (frontendFramework !== 'nextjs') {
    backendFramework = await select<BackendFramework>({
      choices: [
        {
          name: 'Express',
          value: 'express'
        },
        {
          name: 'NestJS',
          value: 'nestjs'
        },
        {
          name: 'Koa',
          value: 'koa'
        },
        {
          name: 'Hapi',
          value: 'hapi'
        },
        {
          name: 'Fastify',
          value: 'fastify'
        }],
      message: 'Which backend framework do you want?'
    });
  } else {
    appDir = await confirm({
      message: 'Do you want to use the appDir?',
      default: false
    });
  }

  const apiKey = await input({
    message: 'Enter your API key (https://dashboard.justaname.id)',
    validate: (input: string) => validateInput(input, 'API key', validateApiKey)
  });

  const appUrl = await input({
    message: 'Enter the URL of your app (example: https://<appName>.com or http://localhost:3000)',
    validate: (input: string) => validateInput(input, 'App URL'),
    default: 'https://' + appName + '.com',
  });

  const ensDomain = await input({
    message: 'Enter your ENS domain',
    validate: (input: string) => validateInput(input, 'ENS domain', validateDomain),
    default: appName + '.eth'
  });

  const network = await select<Network>({
    choices: [{
      name: 'Mainnet',
      value: 'mainnet'
    },
      {
        name: 'Testnet',
        value: 'testnet'
      }
    ],
    message: 'Do you want to use mainnet or sepolia?',
  });

  const directory = await input({
    message: 'Enter the directory for your app (default: .)',
    validate: (input: string) => validateInput(input, 'Directory'),
    default: '.'
  });


  if(frontendFramework !=="nextjs" && !backendFramework) throw new Error('Backend framework is required');

  return {
    appName,
    frontendFramework: frontendFramework === 'nextjs' ? undefined : frontendFramework,
    backendFramework: frontendFramework === 'nextjs' ? undefined : backendFramework,
    fullstackFramework: frontendFramework === 'nextjs' ? 'nextjs' : undefined,
    apiKey,
    ensDomain,
    appUrl,
    network,
    appDir,
    directory
  }
}