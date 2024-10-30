# JustaName SDK

JustaName SDK is a toolkit for managing Ethereum Name Service (ENS) domains and subnames. It simplifies the integration of ENS functionalities into any application, including resolving ENS names, issuing off-chain subnames, and enabling Sign-In with ENS (SIWENS). 
The SDK supports both Ethereum Mainnet and Testnet environments.

## Table of Contents
- [Motivation](#motivation)
- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Quickstart Guide](#quickstart-guide)
    - [Initialization](#initialization)
    - [Issuing a Subname](#issuing-a-subname)
    - [Updating a Subname](#updating-a-subname)
    - [Signing In with ENS](#signing-in-with-ens)
- [Benefits](#benefits)
- [Available Methods](#available-methods)
    - [Subname Management](#subname-management)
    - [SIWE](#siwe)
    - [Sign-In with ENS](#sign-in-with-ens)
    - [Offchain Resolvers](#offchain-resolvers)
- [Contributing](#contributing)

## Motivation

Managing ENS domains and integrating them into applications can be complex and time-consuming. JustaName SDK aims to streamline this process by providing an easy-to-use interface for off-chain ENS management, subname issuance, and authentication using ENS domains. By abstracting the underlying complexities, developers can focus on building feature-rich applications without worrying about ENS integration details.

## Features

- **ENS Management:** Manage ENS domains and subnames off-chain effortlessly.
- **Subname Issuance:** Issue and update subnames without interacting directly with smart contracts.
- **ENS Resolution:** Resolve on-chain and off-chain ENS easily within your application.
- **Sign-In with ENS (SIWENS):** Authenticate users using their ENS domains for a decentralized and secure sign-in experience.
- **Mainnet and Testnet Support:** Compatible with Ethereum Mainnet and Testnet environments.
- **Easy Integration:** Simplifies the incorporation of ENS functionalities into any application.

## How It Works

JustaName SDK interacts with the JustaName API to perform off-chain operations related to ENS domains and subnames. It handles the necessary cryptographic operations, such as signing messages and verifying signatures, to ensure secure interactions. By using the SDK, developers can perform tasks like issuing subnames, updating records, and authenticating users without dealing with the complexities of the Ethereum blockchain directly.

## Installation

Install the package using npm or yarn:

```bash
npm install @justaname.id/sdk

# or

yarn add @justaname.id/sdk
```

## Quickstart Guide
### Initialization
First, import the JustaName SDK and initialize it with your configuration:

```typescript
import { JustaName } from '@justaname.id/sdk';
import { ethers } from 'ethers';

// Initialize the SDK with your configuration
const justaname = JustaName.init({
    networks: [
        {
          chainId: 1, // Ethereum Mainnet
          providerUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY'
        }
    ],
    ensDomains: [
        {
          chainId: 1,
          domain: 'your_ens_domain.eth',
          apiKey: 'your-api-key',
        }
            
    ],
    config: {
        domain: 'yourdapp.com',
        origin: 'https://yourdapp.com'
    }
});

// Create a signer (for example purposes, we're creating a random wallet)
const signer = ethers.Wallet.createRandom();
```

### Issuing a Subname
To issue a subname off-chain, you can use the following code:

```typescript
async function issueSubname() {
    const challenge = await justaname.siwe.requestChallenge({
        address: signer.address,
        chainId: 1 // Ethereum Mainnet
    });
    
    const signature = await signer.signMessage(challenge.challenge);
    
    const response = await justaname.subnames.addSubname(
    {
        username: 'username1',
        chainId: 1
    },
    {
        xMessage: challenge.challenge,
        xAddress: signer.address,
        xSignature: signature
    });
    
    console.log('Subname issued successfully:', response);
    return response;
}
```
### Updating a Subname
To update records associated with a subname, such as setting an avatar:

```typescript
async function updateSubname() {
    const challenge = await justaname.siwe.requestChallenge({
        address: signer.address,
        chainId: 1
    });
    
    const signature = await signer.signMessage(challenge.challenge);
    
    const response = await justaname.subnames.updateSubname(
    {
        username: 'username1',
        chainId: 1,
        text: [
            {
            key: 'avatar',
            value: 'https://youravatar.com/avatar.png'
            }
        ]
    },
    {
        xMessage: challenge.challenge,
        xAddress: signer.address,
        xSignature: signature
    });
    
    console.log('Subname updated successfully:', response);
    return response;
}
```

### Signing In with ENS
Enable users to sign in to your application using their ENS domain:

```typescript
async function signIn() {
    const message = await justaname.signIn.requestSignIn({
        ens: 'your_ens_domain.eth',
        address: signer.address
    });
    
    const signature = await signer.signMessage(message);
    
    const response = await justaname.signIn.signIn({
        message: message,
        signature: signature
    });
    
    console.log('User signed in with ENS:', response.ens);
    return response;
}
```

### Putting It All Together
You can combine these functions to manage subnames and authenticate users:

```typescript
async function main() {
    await issueSubname();
    await updateSubname();
    await signIn();
}

main().catch(console.error);
```

## Available Methods
### Subname Management
- acceptSubname
- reserveSubname
- addSubname
- updateSubname
- revokeSubname
- rejectSubname
- getSubnamesByEnsDomainWithCount
- getSubname
- getSubnamesByAddress
-  getInvitationsByAddress
- getSubnamesByEnsDomain
- searchSubnames
- isSubnameAvailable
- getRecords
- getPrimaryNameByAddress
### SIWE
- requestChallenge
- verifyChallenge
### Sign-In with ENS
- requestSignIn
- signIn
- generateNonce 

[//]: # (### MApp Management)

[//]: # (- checkIfMAppIsEnabled)

[//]: # (- canEnableMApps)

[//]: # (- requestAddMAppPermissionChallenge)

[//]: # (- requestAppendMAppFieldChallenge)

[//]: # (- requestRevokeMAppPermissionChallenge)

[//]: # (- addMAppPermission)

[//]: # (- appendMAppField)

[//]: # (- revokeMAppPermission)
### Offchain Resolvers
- getAllOffchainResolvers

### Benefits
Simplified ENS Integration: Abstracts the complexities of interacting with the Ethereum blockchain and ENS smart contracts.

Off-Chain Management: Perform ENS domain and subname operations off-chain, reducing gas costs and improving performance.

Enhanced Security: Utilizes cryptographic signatures to ensure secure operations.

User-Friendly Authentication: Allows users to sign in with their ENS domains, enhancing user experience and security.

Flexible Environment Support: Works seamlessly with both Ethereum Mainnet and Testnet networks.

### Contributing
Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request on the GitHub repository.

