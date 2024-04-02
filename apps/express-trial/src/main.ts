import express, { Request } from 'express';
import cors from 'cors';
import { JustaName, SubnameUpdateRequest } from '@justaname.id/sdk';
import dotenv from 'dotenv';

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

app.get(
  '/api/request-challenge',
  async (
    req: Request<
      NonNullable<unknown>,
      NonNullable<unknown>,
      NonNullable<unknown>,
      RequestChallenge
    >,
    res
  ) => {
    const address = req.query.address;

    if (!address) {
      res.status(400).send({ message: 'Address is required' });
      return;
    }

    const minutes = 30;
    try {
      const challenge = await justaname.siwe.requestChallenge({
        // 30mins
        ttl: minutes * 60 * 1000,
        chainId,
        origin,
        address,
        domain,
      });

      res.status(200).send(challenge);
      return;
    } catch (error) {
      if (error instanceof Error)
        res.status(500).send({ error: error.message });
    }
  }
);

app.post('/api/subnames/add', async (req: Request<SubnameAdd>, res) => {
  const username = req.body.username;

  if (!username) {
    res.status(400).send({ message: 'Username is required' });
    return;
  }

  if (!req.body.address || !req.body.signature || !req.body.message) {
    res
      .status(400)
      .send({ message: 'Address, signature and message are required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname(
      {
        username: username ?? '',
        ensDomain: domain,
        chainId: chainId,
      },
      {
        xSignature: req.body.signature,
        xAddress: req.body.address,
        xMessage: req.body.message,
      }
    );

    res.status(201).send(add);
    return;
  } catch (error) {
    if (error instanceof Error) res.status(500).send({ error: error.message });
  }
});

export interface SubnameUpdate
  extends Omit<SubnameUpdateRequest, 'ensDomain' | 'chainId'> {
  address: string;
  signature: string;
  message: string;
}

app.post('/api/subnames/update', async (req: Request<SubnameUpdate>, res) => {
  const username = req.body.username;
  const addresses = req.body.addresses;
  const text = req.body.text;
  const contentHash = req.body.contentHash;
  const signature = req.body.signature;
  const address = req.body.address;
  const message = req.body.message;

  if (username === undefined) {
    res.status(400).send({ message: 'Username is required' });
    return;
  }

  if (!addresses) {
    res.status(400).send({ message: 'Addresses are required' });
    return;
  }

  if (!text) {
    res.status(400).send({ message: 'Text records are required' });
    return;
  }

  if (!contentHash && contentHash !== '') {
    res.status(400).send({ message: 'Content hash is required' });
    return;
  }

  if (!req.body.address || !req.body.signature || !req.body.message) {
    res
      .status(400)
      .send({ message: 'Address, signature and message are required' });
    return;
  }

  try {
    const add = await justaname.subnames.updateSubname(
      {
        username: username,
        ensDomain: domain,
        chainId: chainId,
        addresses,
        text,
        contentHash,
      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      }
    );

    res.status(201).send(add);
    return;
  } catch (error) {
    if (error instanceof Error) res.status(500).send({ error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to JustaName Express!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  justaname = await JustaName.init({
    apiKey: process.env.JUSTANAME_API_KEY as string,
  });

  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
