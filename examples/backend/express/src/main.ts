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

interface SubnameClaim {
  username: string;
  address: string;
  signature: string;
  message: string;
}

app.post('/api/subnames/claim', async (req: Request<SubnameClaim>, res) => {

  const username = req.body.username
  const address = req.body.address
  const signature = req.body.signature
  const message = req.body.message

  try {
    const claim = await justaname.subnames.addSubname({
        username: username,
        ensDomain: domain,
        chainId
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

export interface SubnameUpdate {
  username: string;
  address: string;
  signature: string;
  message: string;

}
app.post('/api/subnames/update', async (req: Request<SubnameUpdate>, res) => {

  const username = req.body.username
  const address = req.body.address
  const signature = req.body.signature
  const message = req.body.message

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
    const claim = await justaname.subnames.updateSubname({
        username: username,
        ensDomain: domain,
        chainId,
        text: [],
        contentHash: '',
        addresses: [],
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

const port = process.env.PORT || 3005;
const server = app.listen(port, async  () => {
  justaname = await JustaName.init({
    apiKey: process.env.JUSTANAME_API_KEY as string,
  });


  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

