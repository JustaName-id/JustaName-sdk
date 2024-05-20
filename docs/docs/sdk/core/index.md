---
id: "index"
title: "@justaname.id/sdk"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# JustaName Core SDK

The JustaName Core SDK empowers developers to seamlessly integrate robust digital identity and subnaming features into their Web3 applications. It simplifies the complexities of blockchain addresses by enabling the use of human-readable subdomains within the Ethereum Name Service (ENS).

## Key Features
- **User-Friendly Addresses**: Replace unwieldy blockchain addresses with memorable subnames (e.g., 'yourname.eth').
- **Secure Sign-In (SIWE)**: Implement Ethereum-based authentication without centralized systems.
- **Subname Management**: Create, reserve, update, and revoke subdomains with ease.
- **Cross-Chain Compatibility**: Support interactions across various blockchain networks.

## Installation

```bash
npm install @justaname.id/sdk
```

## Configuration

Obtain an API Key and initialize the SDK:

```typescript
import { JustaName } from '@justaname.id/sdk';

async function main() {
  const apiKey = 'your-api-key';
  const justaName = JustaName.init({ apiKey });
  // Your SDK is now ready to be used!
}

main();
```

## Usage Examples

### SIWE: Request a Secure Sign-In Challenge

```typescript
const requestChallengeResponse = await justaName.siwe.requestChallenge({
  chainId: 1,
  origin: 'http://localhost:3333',
  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
  domain: 'localhost',
});
```

### Subnames: Add a New Subname

```typescript
const addedUser = await justaName.subnames.addSubname({
  username: 'testuser',
  ensDomain: 'justaname.id',
  chainId: 1,
}, {
  xAddress: '0x59c44836630760F97b74b569B379ca94c37B93ca',
  xSignature: '...',
  xMessage: '...'
});
```

## Error Handling

```typescript
try {
  // SDK operations
} catch (error) {
  console.error("Error:", error.message);
}
```

## Security

The JustaName SDK prioritizes security and privacy with encrypted communication and responsible data handling practices.

## Get Started!

Explore the full documentation and in-depth examples on the JustaName Developer Portal: [https://docs.justaname.io](https://docs.justaname.io).

## Core Methods

A key functionality aspect of the SDK revolves around its methods. Below is a list of available methods within the JustaName SDK's primary classes:

### `Siwe` Class Methods

- requestChallenge
- verifyChallenge

### `Subnames` Class Methods
- claimSubname
- reserveSubname
- addSubname
- updateSubname
- revokeSubname
- rejectSubname
- getByDomainNameChainId
- getBySubname
- getAllByAddress
- getRecordsByFullName
- getInvitations
- checkSubnameAvailable

## Conclusion

For more detailed documentation and additional use cases, please visit [JustaName's Documentation](https://docs.justaname.io).
