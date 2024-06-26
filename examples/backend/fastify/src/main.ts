import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify();

fastify.register(cors);

interface RequestChallenge {
  address: string;
}

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID ?? '');
const domain = process.env.JUSTANAME_DOMAIN ?? '';
const origin = process.env.JUSTANAME_ORIGIN ?? '';
const apiKey = process.env.JUSTANAME_API_KEY as string;
const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

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

let justaname: JustaName;

fastify.get('/api/request-challenge', async (request: FastifyRequest<{ Querystring: RequestChallenge }>, reply: FastifyReply) => {
  const { address } = request.query;

  if (!address) {
    reply.status(400).send({ message: 'Address is required' });
    return;
  }

  try {
    const challenge = await justaname.siwe.requestChallenge({
      // 30mins
      ttl:1800000,
      chainId,
      origin,
      address,
      domain,
    });

    reply.status(200).send(challenge);
  } catch (error) {
    if(error instanceof Error)
    reply.status(500).send({ error: error.message });
  }
});

fastify.post<{ Body: SubnameAdd }>('/api/subnames/add', async (request: FastifyRequest<{ Body: SubnameAdd }>, reply: FastifyReply) => {
  const { username, signature, address, message } = request.body;

  if (!username) {
    reply.status(400).send({ message: 'Username is required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname(
      {
        username,
        ensDomain,
        chainId,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );

    reply.status(201).send(add);
  } catch (error) {
    if(error instanceof Error)
    reply.status(500).send({ error: error.message });
  }
});

fastify.get('/api', async (_, reply: FastifyReply) => {
  reply.send({ message: 'Welcome to JustaName Fastify!' });
});

const start = async () => {
  try {
    justaname = await JustaName.init({
      apiKey: process.env.JUSTANAME_API_KEY ?? '',
    });

    await fastify.listen({ port: parseInt(process.env.PORT ?? '3333'), host: '0.0.0.0' });
    console.log('Listening on port 3333: http://localhost:3333/api');

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
