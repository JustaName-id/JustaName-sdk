import express, { Request } from 'express';
import cors from 'cors';
import { JustaName } from '@justaname.id/sdk';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string);
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;

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

let justaname: JustaName;

interface RequestChallenge {
  address: string;
}

app.get('/api/request-challenge', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, NonNullable<unknown>,RequestChallenge>, res) => {

  const address = req.query.address

  if(!address) {
    res.send({ message: 'Address is required' });
    return;
  }

  try {
    const challenge = await justaname.siwe.requestChallenge({
      chainId,
      origin,
      address,
      domain,
    });

    res.status(200).send(challenge);
    return;
  }
  catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

app.post('/api/subnames/add', async (req: Request<SubnameAdd>, res) => {
  const username = req.body.username;

  if(!username) {
    res.send({ message: 'Username is required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname({
      username: username,
      ensDomain: domain,
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
  catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to with-react-express-server!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async  () => {
  justaname = await JustaName.init({
    apiKey: process.env.JUSTANAME_API_KEY as string,
  });


  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

