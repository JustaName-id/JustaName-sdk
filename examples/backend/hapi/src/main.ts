import Hapi from '@hapi/hapi';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv';

dotenv.config();

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string);
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;

if(!origin) {
  throw new Error('Origin is required');
}

if(!chainId) {
  throw new Error('ChainId is required');
}

if(chainId !== 1 && chainId !== 11155111) {
  throw new Error('ChainId is not supported');
}

if (!domain) {
  throw new Error('Domain is required');
}

if (!apiKey) {
  throw new Error('API Key is required');
}

interface RequestChallengeQuery {
  address: string;
}

interface SubnameAddPayload {
  username: string;
  address: string;
  signature: string;
  message: string;
}

let justaname: JustaName;

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3333,
    host: 'localhost',
  });

  justaname = await JustaName.init({ apiKey });

  server.route([
    {
      method: 'GET',
      path: '/api/request-challenge',
      handler: async (request, h) => {
        const query = request.query as RequestChallengeQuery;
        const address = query.address;

        if (!address) {
          return h.response({ message: 'Address is required' }).code(400);
        }

        try {
          const challenge = await justaname.siwe.requestChallenge({
            chainId,
            origin,
            address,
            domain,
          });
          return h.response(challenge).code(200);
        } catch (error) {
          if(error instanceof Error)
          return h.response({ error: error.message }).code(500);
        }
      }
    },
    {
      method: 'POST',
      path: '/api/subnames/add',
      handler: async (request, h) => {
        const payload = request.payload as SubnameAddPayload;

        if (!payload.username) {
          return h.response({ message: 'Username is required' }).code(400);
        }

        try {
          const add = await justaname.subnames.addSubname({
            username: payload.username,
            ensDomain: domain,
            chainId: chainId
          }, {
            xSignature: payload.signature,
            xAddress: payload.address,
            xMessage: payload.message
          });

          return h.response(add).code(201);
        } catch (error) {
          if(error instanceof Error)
          return h.response({ error: error.message }).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/api',
      handler: async () => {
        return { message: 'Welcome to JustaName Hapi!' };
      }
    }
  ]);

  await server.start();
  console.log(`Listening at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
