# Best Practice: Securely Handling API Keys with a Backend

When integrating the JustaName Widget into your platform, it's important to avoid exposing sensitive information, such as your API key, in the frontend. A best practice approach is to set up a backend service to handle calls to JustaName, ensuring that your API key remains secure. In this guide, we'll walk you through configuring the widget and setting up a backend to manage these requests.

## Step 1: Modify your Widget Configuration

Instead of directly adding your API key to the widget configuration on the frontend, you can point your widget to a backend URL that will handle all the sensitive operations. This way, the API key remains safely stored on your server, and the widget communicates with the backend.

Your widget configuration will now include a `backendUrl` like this:

```tsx
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  backendUrl: "http://localhost:3333/",  // Pointing to the backend server
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "",
  ensDomains: [
    {
      ensDomain: "YOUR ENS DOMAIN",
      chainId: 1,
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};

```

## Step 2: Set Up Your Backend with JustaName SDK

To securely handle API requests, you need to create a backend service using the **JustaName SDK**. This backend will manage subname issuance and revocation requests, ensuring your API key is never exposed.

{% hint style="info" %}
This setup can also be achieved using serverless functions, such as AWS Lambda, Google Cloud Functions, or Vercel Functions. Simply deploy the backend logic to your serverless environment and configure your `backendUrl` to point to the appropriate endpoint.
{% endhint %}

1\. **Install JustaName SDK**: Install the JustaName SDK in your backend by running the following command:

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

2. **Backend Configuration**: Create a backend that will handle API requests from the frontend. Below is a simple example of an Express.js server that can handle subname issuance and revocation:

```typescript
import dotenv from "dotenv";
dotenv.config();

import express, { Request } from "express";
import cors from "cors";
import { JustaName, ChainId, JustaNameConfig } from "@justaname.id/sdk";
import Session from "express-session";

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

interface SubnameRequest {
  username: string;
  address: string;
  ensDomain: string;
  signature: string;
  message: string;
}

let justaname: JustaName;

app.use(
  Session({
    name: "JAN-SESSION",
    secret: "JAN-SESSION-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

// Endpoint to add a subname
app.post("/api/subnames/add", async (req: Request<SubnameRequest>, res) => {
  const { username, ensDomain, address, signature, message } = req.body;

  if (!username || !ensDomain || !address || !signature || !message) {
    return res.status(400).send({ message: "Required fields are missing" });
  }

  const chainId = ensDomain === "justan.id" ? 1 : 11155111;

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

  const chainId = ensDomain === "justan.id" ? 1 : 11155111;

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

// Default API response
app.get("/api", (req, res) => {
  res.send({ message: "Welcome to JustaName Express!" });
});

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  justaname = JustaName.init(config);
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);

```

3. **Backend Explanation**:

* **Subname Issuance**: The `/api/subnames/add` endpoint issues new subnames for users. It checks if the address already holds a subname for the given ENS domain before adding the new subname.
* **Subname Revocation**: The `/api/subnames/revoke` endpoint revokes a subname for a specific address.
* **Security**: The API key is never exposed in the frontend and all sensitive operations are handled by the backend.
