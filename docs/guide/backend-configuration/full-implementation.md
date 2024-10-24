# Full Implementation

Below is a **full implementation** example that merges the **Sign-In Routes** using JWT and the **Subname Management Routes** into a single Express.js application:

```typescript
import express, { Request } from 'express';
import cors from 'cors';
import { JustaName, ChainId, JustaNameConfig } from "@justaname.id/sdk";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

// Extract environment variables
const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId;
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;
const providerUrl = process.env.JUSTANAME_PROVIDER_URL as string;
const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

// JustaName configuration
export const config: JustaNameConfig = {
  apiKey,
  providerUrl,
  config: {
    chainId,
    domain,
    origin,
  },
  ensDomain,
};

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

let justaname: JustaName;

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate JWT from cookie
function authenticateToken(req: Request, res, next) {
  const token = req.cookies['justverifiedtoken'];

  if (!token) {
    return res.status(401).json({ message: 'You have to first sign in' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Save user data in request
    next();
  });
}

// Endpoint to generate nonce for sign-in
app.get('/api/signin/nonce', async (req: Request, res) => {
  const nonce = justaname.signIn.generateNonce();
  
  const token = jwt.sign({ nonce }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('justverifiednonce', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.status(200).send(nonce);
});

// Endpoint to handle sign-in using JWT
app.post('/api/signin', async (req: Request, res) => {
  try {
    const { message, signature } = req.body;

    const { data: messageData, ens } = await justaname.signIn.signIn({
      message,
      signature,
    });

    const payload = {
      address: messageData.address,
      ens,
      chainId: messageData.chainId,
    };

    const expiresIn = Math.floor(
      (new Date(messageData.expirationTime).getTime() - Date.now()) / 1000
    );

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    res.cookie('justverifiedtoken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    return res.status(200).send({ ens, address: messageData.address, chainId: messageData.chainId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to retrieve current signed-in user details using JWT
app.get('/api/current', authenticateToken, (req: Request, res) => {
  res.status(200).json({
    ens: req.user.ens,
    address: req.user.address,
    chainId: req.user.chainId,
  });
});

// Endpoint to sign out and clear the JWT
app.post('/api/signout', (req, res) => {
  res.clearCookie('justverifiedtoken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  res.status(200).json({ message: 'You have been signed out' });
});

// Subname Management Routes

interface SubnameRequest {
  username: string;
  address: string;
  ensDomain: string;
  signature: string;
  message: string;
}

// Endpoint to add a subname
app.post("/api/subnames/add", async (req: Request<SubnameRequest>, res) => {
  const { username, ensDomain, address, signature, message } = req.body;

  if (!username || !ensDomain || !address || !signature || !message) {
    return res.status(400).send({ message: "Required fields are missing" });
  }

  const existingNames = await justaname.subnames.getAllByAddress({
    address,
    isClaimed: true,
    chainId,
    coinType: 60,
  });

  if (existingNames.find((name) => name.subname.endsWith(`.${ensDomain}`))) {
    return res.status(400).send({ message: "Address already claimed" });
  }

  try {
    const result = await justaname.subnames.addSubname(
      { username, ensDomain, chainId },
      { xSignature: signature, xAddress: address, xMessage: message }
    );

    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ error: error instanceof Error ? error.message : "Error" });
  }
});

// Endpoint to revoke a subname
app.post("/api/subnames/revoke", async (req: Request<SubnameRequest>, res) => {
  const { username, ensDomain, address, signature, message } = req.body;

  if (!username || !ensDomain || !address || !signature || !message) {
    return res.status(400).send({ message: "Required fields are missing" });
  }

  try {
    const result = await justaname.subnames.revokeSubname(
      { username, ensDomain, chainId },
      { xSignature: signature, xAddress: address, xMessage: message }
    );

    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ error: error instanceof Error ? error.message : "Error" });
  }
});

// Server initialization
const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  justaname = JustaName.init(config);
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
```

