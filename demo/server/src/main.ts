// inspired by https://github.com/spruceid/siwe-quickstart/blob/main/03_complete_app/backend/src/index.js

import express, { Request } from 'express';
import cors from 'cors';
import { JustaName } from '@justaname.id/sdk';
import { config } from './config';
import dotenv from 'dotenv';
import Session from 'express-session';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

let justaname: JustaName;

type Siwens = { address: string; ens: string; chainId: number };

declare module 'express-session' {
  interface SessionData {
    nonce: string | null;
    siwens: Siwens | null;
  }
}

app.use(
  Session({
    name: 'siwens-quickstart',
    secret: 'siwens-quickstart-secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  }) as unknown as express.RequestHandler
);

app.get('/api/signin/nonce', async (req: Request, res) => {
  req.session.nonce = justaname.signIn.generateNonce();
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(req.session.nonce);
});

app.post('/api/signin', async (req: Request, res) => {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: 'Expected prepareMessage object as body.' });
      return;
    }

    if (!req.body.signature) {
      res.status(422).json({ message: 'Expected signature as body.' });
      return;
    }

    if (!req.session.nonce) {
      res.status(401).json({ message: 'No nonce found.' });
      return;
    }

    const { data: message, ens } = await justaname.signIn.signIn({
      message: req.body.message,
      signature: req.body.signature,
      nonce: req.session.nonce,
    });

    if (!message) {
      res.status(500).json({ message: 'No message returned.' });
      return;
    }

    if (!message.expirationTime) {
      res.status(500).json({ message: 'No expirationTime returned.' });
    }

    req.session.siwens = {
      address: message.address,
      ens,
      chainId: message.chainId,
    };
    req.session.cookie.expires = new Date(
      message?.expirationTime || new Date()
    );
    req.session.save(() => res.status(200).send(true));
  } catch (e) {
    req.session.siwens = null;
    req.session.nonce = null;
    req.session.save(() => res.status(500).json({ message: e.message }));
    console.error(e);
  }
});

app.get('/api/current', function (req, res) {
  if (!req.session.siwens) {
    res.status(401).json({ message: 'You have to first sign_in' });
    return;
  }
  console.log('User is authenticated!');
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send({
    ens: req.session.siwens?.ens,
    address: req.session.siwens?.address,
    chainId: req.session.siwens?.chainId,
  });
});

app.post('/api/signout', function (req, res) {
  req.session.siwens = null;
  req.session.nonce = null;
  req.session.save(() => res.status(200).send(true));
});

app.post('/api/subnames/add', async (req: Request<SubnameAdd>, res) => {
  const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

  const username = req.body.username;

  const text = req.body.text;

  const addresses = req.body.addresses;

  const contentHash = req.body.contentHash;

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
        username,
        ensDomain,
        text: text,
        addresses: addresses,
        contentHash,
        signature: req.body.signature,
      },
      {
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

app.post('/api/subnames/revoke', async (req: Request<SubnameAdd>, res) => {
  const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

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
    const revoke = await justaname.subnames.revokeSubname(
      {
        username,
        ensDomain,
        signature: req.body.signature,
      },
      {
        xAddress: req.body.address,
        xMessage: req.body.message,
      }
    );

    res.status(200).send(revoke);
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
  justaname = JustaName.init(config);

  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
