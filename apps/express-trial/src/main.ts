// inspired by https://github.com/spruceid/siwe-quickstart/blob/main/03_complete_app/backend/src/index.js

import express, { Request } from 'express';
import cors from 'cors';
import { JustaName } from '@justaname.id/sdk';
import { config } from './config';
import dotenv from 'dotenv';
import Session from 'express-session';
dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

interface SubnameAdd {
  username: string;
  address: string;
  signature: string;
  message: string;
}

let justaname: JustaName;

type Siwj = { address: string, ens: string };

declare module 'express-session' {
  interface SessionData {
    nonce: string | null;
    siwj: Siwj | null;
  }
}

app.use(Session({
  name: 'siwj-quickstart',
  secret: "siwj-quickstart-secret",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, sameSite: true }
}));

app.get('/api/signin/nonce', async (req: Request, res) => {
  req.session.nonce = justaname.signIn.generateNonce();
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(req.session.nonce);
})

app.post('/api/signin', async (req: Request, res) => {
  try {
    if (!req.body.message) {
      res.status(422).json({ message: 'Expected prepareMessage object as body.' });
      return;
    }

    if(!req.body.signature) {
      res.status(422).json({ message: 'Expected signature as body.' });
      return;
    }

    const { data: message, ens } = await justaname.signIn.signIn( req.body.message,  req.body.signature );

    if (!message) {
      res.status(500).json({ message: 'No message returned.' });
      return;
    }

    if (!message.expirationTime) {
      res.status(500).json({ message: 'No expirationTime returned.' });
    }

    req.session.siwj = { address: message.address, ens };
    req.session.cookie.expires = new Date(message?.expirationTime || new Date());
    req.session.save(() => res.status(200).send(true));
  } catch (e) {
    req.session.siwj = null;
    req.session.nonce = null;
    req.session.save(() => res.status(500).json({ message: e.message }));
    console.error(e);
  }
})

app.get('/api/current', function (req, res) {
  if (!req.session.siwj) {
    res.status(401).json({ message: 'You have to first sign_in' });
    return;
  }
  console.log("User is authenticated!");
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send({ ens: req.session.siwj?.ens, address: req.session.siwj?.address });
});

app.get('/api/signout', function (req, res) {
  req.session.siwj = null;
  req.session.nonce = null;
  req.session.save(() => res.status(200).send(true));
})

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

