import express, { Request } from 'express';
import { JustaName } from '@justaname.id/sdk';

const app = express();

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
    res.send( challenge );
    return;
  }
  catch (error) {
    console.error(error);
  }

  res.send({ message: 'Something went wrong' });
})

interface SubnameAvailable {
  username: string;
}

app.get('/api/subname/available', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, NonNullable<unknown>,SubnameAvailable>, res) => {

  const username = req.query.username

  if(!username) {
    res.send({ message: 'Username is required' });
    return;
  }

  try {
    const available = await justaname.subnames.checkSubnameAvailable({
      subname: username + '.' + domain,
      chainId,
    });
    res.send({ available } );
    return;
  }
  catch (error) {
    console.error(error);
  }

  res.send({ message: 'Something went wrong' });
})

interface SubnameClaim {
  username: string;
  address: string;
  signature: string;
  message: string;
}

app.get('/api/subname/claim', async (req: Request<NonNullable<unknown>, NonNullable<unknown>, NonNullable<unknown>,SubnameClaim>, res) => {

  const username = req.query.username
  const address = req.query.address
  const signature = req.query.signature
  const message = req.query.message

  if(!username) {
    res.send({ message: 'Username is required' });
    return;
  }

  if(!address) {
    res.send({ message: 'Address is required' });
    return;
  }

  if(!signature) {
    res.send({ message: 'Signature is required' });
    return;
  }

  try {
    const claim = await justaname.subnames.addSubname({
        username: username,
        ensName: domain,
        chainId,
        addresses: [
          {
            coinType: 60,
            address: address,
          }
        ],
        text: [],
        contentHash: ""

      },
      {
        xSignature: signature,
        xAddress: address,
        xMessage: message,
      });
    res.send( claim );
    return;
  }
  catch (error) {
    console.error(error);
  }

  res.send({ message: 'Something went wrong' });
})

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

