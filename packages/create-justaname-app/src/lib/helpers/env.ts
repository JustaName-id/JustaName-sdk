import { AppDetails, BackendFramework, FrontendFramework, FullstackFramework } from './questions';

export const frameworkEnv: Record<FrontendFramework | BackendFramework | FullstackFramework, string>= {
  'nextjs':
    `NEXT_PUBLIC_ENS_DOMAIN={{domain}}
    NEXT_PUBLIC_CHAIN_ID={{chainId}}
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}`,
  'express':
    `JUSTANAME_DOMAIN={{domain}}
     JUSTANAME_CHAIN_ID={{chainId}}
     JUSTANAME_API_KEY={{apiKey}}
     JUSTANAME_ORIGIN={{origin}}
    `,
  'react': `
    VITE_APP_API_URL={{apiKey}}
    VITE_APP_ENS_DOMAIN={{domain}}
    VITE_APP_CHAIN_ID={{chainId}}
  `,
  'react-native': `
    API_URL={{apiKey}}
    ENS_DOMAIN={{domain}}
    CHAIN_ID={{chainId}}
  `,
  'expo': `
    API_URL={{apiKey}}
    ENS_DOMAIN={{domain}}
    CHAIN_ID={{chainId}}
  `,
  'nestjs': `
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'koa': `
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'hapi': `
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `,
  'fastify': `
    JUSTANAME_DOMAIN={{domain}}
    JUSTANAME_CHAIN_ID={{chainId}}
    JUSTANAME_API_KEY={{apiKey}}
    JUSTANAME_ORIGIN={{origin}}
  `
}


export const getEnv = (framework: FrontendFramework | BackendFramework | FullstackFramework, appDetails: AppDetails) => {
  const env = frameworkEnv[framework];
  return env.replace(/{{domain}}/g, appDetails.ensDomain)
            .replace(/{{chainId}}/g, appDetails.network === 'mainnet' ? '1' : '11155111')
            .replace(/{{apiKey}}/g, appDetails.apiKey)
            .replace(/{{origin}}/g, appDetails.appUrl)
}