import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

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

if (!origin || !chainId || !domain || (chainId !== 1 && chainId !== 11155111)) {
  console.error('Environment configuration is invalid');
  process.exit(1);
}

let justaname: JustaName;

fastify.get('/api/request-challenge', async (request: FastifyRequest<{ Querystring: RequestChallenge }>, reply: FastifyReply) => {
  const { address } = request.query;

  if (!address) {
    reply.send({ message: 'Address is required' });
    return;
  }

  try {
    const challenge = await justaname.siwe.requestChallenge({
      chainId,
      origin,
      address,
      domain,
    });

    reply.status(200).send(challenge);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
});

fastify.post<{ Body: SubnameAdd }>('/api/subnames/add', async (request: FastifyRequest<{ Body: SubnameAdd }>, reply: FastifyReply) => {
  const { username, signature, address, message } = request.body;

  if (!username) {
    reply.send({ message: 'Username is required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname(
      {
        username,
        ensDomain: domain,
        chainId,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );

    reply.status(201).send(add);
  } catch (error: any) {
    reply.status(500).send({ error: error.message });
  }
});

fastify.get('/api', async (request: any, reply: FastifyReply) => {
  reply.send({ message: 'Welcome to the server!' });
});

const start = async () => {
  try {
    justaname = await JustaName.init({
      apiKey: process.env.JUSTANAME_API_KEY ?? '',
    });

    await fastify.listen({ port: parseInt(process.env.PORT ?? '3333'), host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
