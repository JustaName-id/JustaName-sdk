# Sign In Routes

The **Sign-In** functionality for the JustaName Widget can be implemented using two approaches: session-based authentication or JWT (JSON Web Token) authentication. Both methods provide secure ways for users to sign in with their ENS or wallet address. Below are implementations for each method.

## Install JustaName SDK

Install the JustaName SDK in your backend by running the following command:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @justaname.id/sdk
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @justaname.id/sdk
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justaname.id/sdk
```
{% endtab %}
{% endtabs %}

## Sign-In with Sessions

In this approach, **express-session** is used to handle user sessions. The session data is stored on the server, and the user's sign-in information (such as their ENS and wallet address) is persisted throughout their session.

{% hint style="info" %}
This setup can also be achieved using serverless functions, such as AWS Lambda, Google Cloud Functions, or Vercel Functions. Simply deploy the backend logic to your serverless environment and configure your `backendUrl` in the Widget to point to the appropriate endpoint.
{% endhint %}

**Example: Session-Based Sign-In**

```typescript
import express, { Request } from 'express';
import cors from 'cors';
import { JustaName, ChainId, JustaNameConfig } from "@justaname.id/sdk";
import dotenv from 'dotenv';
import Session from 'express-session';

dotenv.config();

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId;
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;
const providerUrl = process.env.JUSTANAME_PROVIDER_URL as string;
const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

export const config: JustaNameConfig = {
  apiKey,
  providerUrl: providerUrl,
  config:{
    chainId,
    domain,
    origin,
  },
  ensDomain
}

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

let justaname: JustaName;

type Siwens = { address: string; ens: string; chainId: number };

declare module 'express-session' {
  interface SessionData {
    nonce: string | null;
    siwens: Siwens | null;
  }
}

// Session configuration
app.use(
  Session({
    name: 'siwens-session',
    secret: 'siwens-session-secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

// Endpoint to generate nonce for sign-in
app.get('/api/signin/nonce', async (req: Request, res) => {
  req.session.nonce = justaname.signIn.generateNonce();
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(req.session.nonce);
});

// Endpoint to handle sign-in
app.post('/api/signin', async (req: Request, res) => {
  try {
    const { message, signature } = req.body;
    
    if (!message || !signature) {
      return res.status(422).json({ message: 'Missing message or signature.' });
    }

    const { data: signedInData, ens } = await justaname.signIn.signIn({
      message,
      signature,
    });

    req.session.siwens = {
      address: signedInData.address,
      ens,
      chainId: signedInData.chainId,
    };

    req.session.cookie.expires = new Date(signedInData?.expirationTime || new Date());
    req.session.save(() => res.status(200).send(true));
  } catch (error) {
    req.session.siwens = null;
    req.session.nonce = null;
    req.session.save(() => res.status(500).json({ message: error.message }));
  }
});

// Endpoint to retrieve current signed-in user details
app.get('/api/current', (req, res) => {
  if (!req.session.siwens) {
    return res.status(401).json({ message: 'Not signed in.' });
  }

  res.status(200).json({
    ens: req.session.siwens.ens,
    address: req.session.siwens.address,
    chainId: req.session.siwens.chainId,
  });
});

// Endpoint to sign out the user
app.post('/api/signout', (req, res) => {
  req.session.siwens = null;
  req.session.nonce = null;
  req.session.save(() => res.status(200).send(true));
});

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  justaname = JustaName.init(config);
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
```

## Sign-In with JWT (JSON Web Token)

In this approach, **JWT** is used to manage user authentication. After the user signs in, a JWT is issued, containing the user's ENS and wallet address. This token is stored in an HttpOnly cookie, and subsequent requests authenticate the user via the JWT.

**Example: JWT-Based Sign-In**

```typescript
import express, { Request } from 'express';
import cors from 'cors';
import { JustaName, ChainId, JustaNameConfig } from "@justaname.id/sdk";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const chainId = parseInt(process.env.JUSTANAME_CHAIN_ID as string) as ChainId;
const domain = process.env.JUSTANAME_DOMAIN as string;
const origin = process.env.JUSTANAME_ORIGIN as string;
const apiKey = process.env.JUSTANAME_API_KEY as string;
const providerUrl = process.env.JUSTANAME_PROVIDER_URL as string;
const ensDomain = process.env.JUSTANAME_ENS_DOMAIN as string;

export const config: JustaNameConfig = {
  apiKey,
  providerUrl: providerUrl,
  config:{
    chainId,
    domain,
    origin,
  },
  ensDomain
}

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

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  justaname = JustaName.init(config);
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
```

**Backend Explanation**:

* **Nonce Generation**: The `/api/signin/nonce` endpoint generates a unique nonce for the user, which is used to verify the user's identity when they sign in.&#x20;
* **User Authentication**: The `/api/signin` endpoint verifies the user's signature using the nonce and their wallet. Once the signature is validated, the user's session is established, either using **sessions** or **JWT tokens**, depending on the implementation. The backend securely handles the entire authentication process to prevent any exposure of sensitive data on the frontend.
* **Session or JWT Token Handling**: After successful authentication, the backend creates either a **session** or issues a **JWT token** to manage the user's authentication state. This session or token is stored securely (e.g., in cookies) and used to authenticate subsequent requests.
* **Security**: User authentication and session management are handled entirely on the backend, ensuring that sensitive operations such as nonce generation and signature verification are not exposed to the frontend, maintaining a high level of security
