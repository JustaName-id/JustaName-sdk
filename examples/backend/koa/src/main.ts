import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string);
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}


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

let justaname: JustaName;

router.get('/api/request-challenge', async (ctx) => {
  const address = ctx.query.address as string;

  if (!address) {
    ctx.status = 400;
    ctx.body = { message: 'Address is required' };
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

    ctx.status = 200;
    ctx.body = challenge;
  } catch (error) {
    ctx.status = 500;
    if (error instanceof Error)
    ctx.body = { error: error.message };
  }
});


router.post('/api/subnames/add', async (ctx) => {
  const { username, address, signature, message } = <SubnameAdd>ctx.request.body;

  if (!username) {
    ctx.status = 400;
    ctx.body = { message: 'Username is required' };
    return;
  }

  try {
    const add = await justaname.subnames.addSubname(
      {
        username: username,
        ensDomain: domain,
        chainId: chainId,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );

    ctx.status = 201;
    ctx.body = add;
  } catch (error) {
    ctx.status = 500;
    if (error instanceof Error)
    ctx.body = { error: error?.message };
  }
});

router.get('/api', (ctx) => {
  ctx.body = { message: 'Welcome to JustaName Koa!' };
});

app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  justaname = await JustaName.init({
    apiKey: process.env.JUSTANAME_API_KEY as string,
  });

  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
