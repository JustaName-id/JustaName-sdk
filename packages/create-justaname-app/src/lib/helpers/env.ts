import { AppDetails, BackendFramework, FrontendFramework, FullstackFramework } from './questions';

/**
 * Maps each supported framework to its corresponding environment variable template.
 * 
 * @type {Record<string, string>}
 */
export const frameworkEnv: Record<FrontendFramework | BackendFramework | FullstackFramework, string>= {
  'nextjs':
    `NEXT_PUBLIC_ENS_DOMAIN={{ensDomain}}
    NEXT_PUBLIC_CHAIN_ID={{chainId}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}`,
  'react': `
    VITE_APP_API_URL=http://localhost:3333
    VITE_APP_ENS_DOMAIN={{ensDomain}}
    VITE_APP_CHAIN_ID={{chainId}}
  `,
  'react-native': `
    API_URL=http://localhost:3333
    ENS_DOMAIN={{ensDomain}}
    CHAIN_ID={{chainId}}
  `,
  'expo': `
    API_URL=http://localhost:3333
    ENS_DOMAIN={{ensDomain}}
    CHAIN_ID={{chainId}}
  `,
  'express':
    `JUSTANAME_ENS_DOMAIN={{ensDomain}}
     JUSTANAME_DOMAIN={{domain}}
     JUSTANAME_CHAIN_ID={{chainId}}
     JUSTANAME_API_KEY={{apiKey}}
     JUSTANAME_ORIGIN={{origin}}
    `,
  'nestjs': `
    JUSTANAME_ENS_DOMAIN={{ensDomain}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'koa': `
    JUSTANAME_ENS_DOMAIN={{ensDomain}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'hapi': `
    JUSTANAME_ENS_DOMAIN={{ensDomain}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'fastify': `
    JUSTANAME_ENS_DOMAIN={{ensDomain}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `
}

/**
 * Generates environment variable configurations for a given framework based on the specified application details.
 * 
 * @param {FrontendFramework | BackendFramework | FullstackFramework} framework - The selected framework for the application.
 * @param {AppDetails} appDetails - The detailed specifications of the application.
 * @returns {string} The generated environment variable configuration for the project.
 */
export const getEnv = (framework: FrontendFramework | BackendFramework | FullstackFramework, appDetails: AppDetails) => {
  const env = frameworkEnv[framework];
  const envMatched =  env.replace(/{{ensDomain}}/g, appDetails.ensDomain)
            .replace(/{{chainId}}/g, appDetails.network === 'mainnet' ? '1' : '11155111')
            .replace(/{{apiKey}}/g, appDetails.apiKey)
            .replace(/{{origin}}/g, appDetails.appUrl)
            .replace(/{{domain}}/g, appDetails.appUrl.split('://')[1])

  return envMatched;
}