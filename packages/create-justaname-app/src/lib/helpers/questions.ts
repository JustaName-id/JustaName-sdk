import { confirm, input, select } from '@inquirer/prompts';
import { validateApiKey, validateDomain, validateInput } from './validate';

export type FrontendFramework = 'react' | 'nextjs' | 'react-native' | 'expo';

export type BackendFramework = 'express' | 'nestjs' | 'koa' | 'hapi' | 'fastify';

export type Network = 'mainnet' | 'testnet';

export interface AppDetails {
  appName: string;
  frontendFramework: FrontendFramework;
  backendFramework: BackendFramework;
  apiKey: string;
  ensDomain: string;
  directory: string;
  network: Network;
  appDir?: boolean;
}

export const collectAppDetails = async (): Promise<AppDetails> => {

  let appDir = false;
  let backendFramework: BackendFramework | undefined;

  const appName = await input({
    message: 'What is the name of your app?',
    validate: (input: string) => validateInput(input, 'App name')
  });

  const frontendFramework = await select<FrontendFramework>({
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
    message: 'Enter your API key (https://admin.justaname.id)',
    validate: (input: string) => validateInput(input, 'API key', validateApiKey)
  });

  const ensDomain = await input({
    message: 'Enter your ENS domain',
    validate: (input: string) => validateInput(input, 'ENS domain', validateDomain)
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


  if(!backendFramework) throw new Error('Backend framework is required');

  return {
    appName,
    frontendFramework,
    backendFramework,
    apiKey,
    ensDomain,
    network,
    appDir,
    directory
  }
}