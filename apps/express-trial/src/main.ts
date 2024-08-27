import express, { Request } from 'express';
import cors from 'cors';
import { JustaName } from '@justaname.id/sdk';
import { config } from './config';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

let justaname: JustaName;

app.post('/api/subnames/add', async (req: Request<SubnameAdd>, res) => {

  const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

  const username = req.body.username;

  if (!username) {
    res.status(400).send({ message: 'Username is required' });
    return;
  }

  if (!req.body.address || !req.body.signature || !req.body.message) {
    res.status(400).send({ message: 'Address, signature and message are required' });
    return;
  }

  try {
    const add = await justaname.subnames.addSubname({
        username,
        ensDomain,
        chainId: config.config.siwe.chainId
      },
      {
        xSignature: req.body.signature,
        xAddress: req.body.address,
        xMessage: req.body.message
      });

    res.status(201).send(add);
    return;
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({ error: error.message });
  }
});


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to JustaName Express!' });
});

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {

  justaname = JustaName.init(config);

  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

