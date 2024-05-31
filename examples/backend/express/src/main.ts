import express, { Request } from 'express';
import cors from 'cors';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

interface RequestChallenge {
  address: string;
}

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string);
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
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

app.get('/api/request-challenge', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, NonNullable<unknown>,RequestChallenge>, res) => {

  const address = req.query.address

  if(!address) {
    res.status(400).send({ message: 'Address is required' });
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

    res.status(200).send(challenge);
    return;
  }
  catch (error) {
    if(error instanceof Error)
    res.status(500).send({ error: error.message });
  }
});

app.post('/api/subnames/add', async (req: Request<SubnameAdd>, res) => {
  const username = req.body.username;

  if(!username) {
    res.status(400).send({ message: 'Username is required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname({
      username: username,
      ensDomain: ensDomain,
      chainId: chainId
    },
    {
      xSignature: req.body.signature,
      xAddress: req.body.address,
      xMessage: req.body.message
    });

    res.status(201).send(add);
    return;
  }
  catch (error) {
    if(error instanceof Error)
    res.status(500).send({ error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to JustaName Express!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async  () => {
  justaname = await JustaName.init({
    apiKey: process.env.JUSTANAME_API_KEY as string,
  });


  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

