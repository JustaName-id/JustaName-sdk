# JustaName Core SDK

The **JustaName Core SDK** enables seamless integration of decentralized identity and ENS (Ethereum Name Service) management into your dApps, offering a modern, gasless, and user-friendly experience. Whether you want to issue ENS subnames, update records for free, or authenticate users with their ENS, JustaName provides an easy-to-use solution.

## Key Features

### 1. **Gasless Subname Issuance**
Issue ENS subnames without users having to worry about gas fees. The SDK supports gasless transactions, allowing you to provide a frictionless experience when users claim or manage their subnames.

### 2. **Free ENS Record Updates**
Update your ENS records for free! Modify subname information like avatars, descriptions, and more without incurring any gas fees. This feature allows for fast and frequent updates, giving users more control over their ENS profiles and metadata.

### 3. **SIWENS: Authentication Using ENS**
Authenticate users with **SIWENS (Sign-In with Ethereum + ENS)**, ensuring not only that users control their Ethereum wallet, but also verifying ownership of the ENS domain used during login. This adds an extra layer of security and simplifies the login process for users.

### 4. **ENS Name Resolution**
Easily resolve ENS names to their corresponding Ethereum addresses, allowing you to build ENS-powered applications that rely on human-readable identifiers. This makes it simpler for users to interact with decentralized applications using familiar ENS names rather than long, complex wallet addresses.

### 5. **Metadata Applications (mApps)**
Leverage **mApps (Metadata Applications)** to manage custom fields and permissions associated with ENS records. Add, modify, or revoke mApp permissions dynamically, allowing for decentralized, role-based access to your dApp’s features.

### 6. **Cross-Chain Support**
The SDK is designed to support multiple blockchains, including Ethereum mainnet, testnets, and other EVM-compatible networks. This cross-chain support ensures your dApp is scalable and adaptable to different blockchain ecosystems.

## Why Choose JustaName SDK?

- **Gasless & User-Friendly**: Enable users to issue and manage ENS subnames without needing to pay gas fees.
- **Effortless ENS Management**: Free record updates for ENS profiles, making it simple to keep user data current and relevant.
- **Enhanced Security**: With SIWENS authentication, users' ENS domain ownership is verified, providing a secure and decentralized identity solution.
- **Easy ENS Resolution**: Quickly resolve ENS names to Ethereum addresses for seamless transactions and interactions.
- **Custom Metadata Management**: mApps allow you to extend ENS profiles with custom data and permissions, perfect for complex, role-based dApps.
- **Multi-Chain Flexibility**: Build dApps that are blockchain-agnostic, with full support for Ethereum and EVM-compatible chains.

## Quickstart

Install the SDK via npm or yarn:

```bash
npm install @justaname.id/sdk

or

yarn add @justaname.id/sdk
```

## Example Usage

```typescript
import { JustaName } from '@justaname.id/sdk';

// Initialize the SDK with your configuration
const justaname = JustaName.init({
  apiKey: 'your-api-key',
  networks: [
    {
      chainId: 1, // Ethereum Mainnet
      providerUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY'
    }
  ],
  ensDomains: [{
    chainId: 1,
    domain: 'your_ens_domain.eth'
  }],
  config:{
    domain: 'yourdapp.com',
    origin: 'https://yourdapp.com'
  }
});

const signer = ethers.Wallet.createRandom();

async function issueSubname() {
  const challenge = await justaname.siwe.requestChallenge({
    address: signer.address,
    chainId: CHAIN_ID,
  });

  const signature = await signer.signMessage(challenge.challenge);
  const response = await justaname.subnames.addSubname({
    username: 'username1',
    chainId: CHAIN_ID,
  }, {
    xMessage: challenge.challenge,
    xAddress: signer.address,
    xSignature: signature
  })
  
  return response;
}

async function updateSubname() {
    const challenge = await justaname.siwe.requestChallenge({
        address: signer.address,
        chainId: CHAIN_ID,
    });
    
    const signature = await signer.signMessage(challenge.challenge);
    
    const response = await justaname.subnames.updateSubname({
        username: 'username1',
        chainId: CHAIN_ID,
        text: [{
            key: 'avatar',
            value: 'https://youravatar.com/avatar.png'
        }]
    }, {
        xMessage: challenge.challenge,
        xAddress: signer.address,
        xSignature: signature
    });
    
    return response;
}


async function signIn() {
  
  const requestChallenge = await justaname.signIn.requestSignIn({
    ens: 'your_ens_domain.eth',
    address: signer.address
  }) // usually this will be done on the frontend
  const signature = await signer.signMessage(requestChallenge.message);
  
  const response = await justaname.signIn.signIn(
    requestChallenge.message,
    signature
  ) // usually this will be done on the backend
  
  console.log('User signed in with ENS:', response.ens);
}

async function main() {
  await issueSubname();
  await updateSubname();
  await signIn();
}
```